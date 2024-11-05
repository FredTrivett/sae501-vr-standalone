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

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
});

