import express from 'express';
import fs from 'fs';
import multer from 'multer';
import AdmZip from 'adm-zip';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());



app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//app.use('/uploads', express.static(uploadsDir));



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
app.post('/uploads', upload.single('file'), (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // res.send('Fichier reçu avec succès');

        const uploadId = req.uploadId;
        const uploadPath = path.join(uploadsDir, uploadId);
        const zipPath = path.join(uploadPath, 'upload.zip');

        // Extract the ZIP file
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(uploadPath, true);

        // Delete the original ZIP file
        fs.unlinkSync(zipPath);

        res.json({
            message: 'File uploaded and extracted successfully',
            uploadId: uploadId
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to process upload: ' + error.message });
    }
});

// // Add an endpoint to list all uploads
app.get('/projects', (req, res) => {
    try {
        const uploads = fs.readdirSync(uploadsDir);
        res.json({ uploads });
    } catch (error) {
        console.error('Error listing uploads:', error);
        res.status(500).json({ error: 'Failed to list uploads' });
    }
});

// Add a route to view uploaded files
app.get('/view/:id', (req, res) => {
    try {
        const uploadId = req.params.id;
        const uploadPath = path.join(uploadsDir, uploadId);

        // Check if the upload directory exists
        if (!fs.existsSync(uploadPath)) {
            return res.status(404).json({ error: 'Upload not found' });
        }

        // Clean up the assets directory
        fs.readdirSync(viewAssetsDir).forEach(file => {
            fs.rmSync(path.join(viewAssetsDir, file), { recursive: true, force: true });
        });

        // Copy files from the upload directory to view/assets
        fs.readdirSync(uploadPath).forEach(file => {
            const sourcePath = path.join(uploadPath, file);
            const destPath = path.join(viewAssetsDir, file);
            fs.cpSync(sourcePath, destPath, { recursive: true });
        });

        // Redirect to the view page
        res.redirect('https://mmi22-16.mmi-limoges.fr/view');
    } catch (error) {
        console.error('Error copying files:', error);
        res.status(500).json({ error: 'Failed to copy files: ' + error.message });
    }
});



const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
});
