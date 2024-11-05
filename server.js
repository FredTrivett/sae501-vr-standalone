import express from 'express';
import multer from 'multer';
import AdmZip from 'adm-zip';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Configure multer for ZIP file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/zip') {
            cb(null, true);
        } else {
            cb(new Error('Only ZIP files are allowed'));
        }
    },
});

// Handle ZIP upload
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const zip = new AdmZip(req.file.buffer);
        const uploadDir = path.join(__dirname, 'uploads');

        // Extract the ZIP contents to the uploads directory
        zip.extractAllTo(uploadDir, true);

        res.json({ message: 'File uploaded and extracted successfully' });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to process upload' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

