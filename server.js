import express from 'express';
import multer from 'multer';
import AdmZip from 'adm-zip';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from the view directory and its subdirectories
app.use('/view', express.static(path.join(__dirname, 'view')));
app.use('/assets', express.static(path.join(__dirname, 'view/assets')));
app.use('/app', express.static(path.join(__dirname, 'view/app')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Create view/assets directory if it doesn't exist
const viewAssetsDir = path.join(__dirname, 'view', 'assets');
if (!fs.existsSync(viewAssetsDir)) {
    fs.mkdirSync(path.join(__dirname, 'view'), { recursive: true });
    fs.mkdirSync(viewAssetsDir);
}

// Configure multer for ZIP file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Generate unique ID for this upload
        const uploadId = uuidv4();
        const uploadPath = path.join(uploadsDir, uploadId);

        // Create directory for this upload
        fs.mkdirSync(uploadPath);

        // Store uploadId for later use
        req.uploadId = uploadId;
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, 'upload.zip');
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/zip') {
            cb(null, true);
        } else {
            cb(new Error('Only ZIP files are allowed'));
        }
    }
});

// Handle ZIP upload
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uploadId = req.uploadId;
        const uploadPath = path.join(uploadsDir, uploadId);
        const zipPath = path.join(uploadPath, 'upload.zip');

        // Extract the ZIP file
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(uploadPath, true);

        // Delete the original ZIP file
        fs.unlinkSync(zipPath);

        // Copy files to view/assets for immediate access
        fs.readdirSync(uploadPath).forEach(file => {
            const sourcePath = path.join(uploadPath, file);
            const destPath = path.join(viewAssetsDir, file);
            if (fs.existsSync(destPath)) {
                fs.rmSync(destPath, { recursive: true, force: true });
            }
            fs.cpSync(sourcePath, destPath, { recursive: true });
        });

        res.json({
            message: 'File uploaded and extracted successfully',
            uploadId: uploadId
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to process upload: ' + error.message });
    }
});

// Add an endpoint to list all uploads
app.get('/uploads', (req, res) => {
    try {
        const uploads = fs.readdirSync(uploadsDir);
        res.json({ uploads });
    } catch (error) {
        console.error('Error listing uploads:', error);
        res.status(500).json({ error: 'Failed to list uploads' });
    }
});

// Update the view route to handle both the root /view and /view/:id
app.get('/view', (req, res) => {
    console.log('Accessing main view route');
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/view/:id', (req, res) => {
    try {
        const uploadId = req.params.id;
        const uploadPath = path.join(uploadsDir, uploadId);

        console.log('Accessing view with ID:', uploadId);
        console.log('Upload path:', uploadPath);

        // Check if the upload directory exists
        if (!fs.existsSync(uploadPath)) {
            console.log('Upload directory not found');
            return res.status(404).json({ error: 'Upload not found' });
        }

        console.log('Upload directory exists, cleaning assets...');
        // Clean up the assets directory
        fs.readdirSync(viewAssetsDir).forEach(file => {
            console.log('Removing file from assets:', file);
            fs.rmSync(path.join(viewAssetsDir, file), { recursive: true, force: true });
        });

        console.log('Copying files to assets directory...');
        // Copy files from the upload directory to view/assets
        fs.readdirSync(uploadPath).forEach(file => {
            console.log('Copying file:', file);
            const sourcePath = path.join(uploadPath, file);
            const destPath = path.join(viewAssetsDir, file);
            fs.cpSync(sourcePath, destPath, { recursive: true });
        });

        console.log('Sending index.html...');
        // Send the index.html file
        res.sendFile(path.join(__dirname, 'view', 'index.html'));
    } catch (error) {
        console.error('Error in /view/:id route:', error);
        res.status(500).json({ error: 'Failed to copy files: ' + error.message });
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
});
