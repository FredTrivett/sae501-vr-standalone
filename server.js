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
const viewDir = path.join(__dirname, 'view');

// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }

// Create view/assets directory if it doesn't exist
// const viewAssetsDir = path.join(__dirname, 'view', 'assets');
// if (!fs.existsSync(viewAssetsDir)) {
//     fs.mkdirSync(path.join(__dirname, 'view'), { recursive: true });
//     fs.mkdirSync(viewAssetsDir);
// }

// Configure multer for ZIP file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Generate unique ID for this upload

        fs.readdirSync(uploadsDir).forEach(file => {
            fs.rmSync(path.join(uploadsDir, file), { recursive: true, force: true });
        });

        const projectName = req.body.projectName; // Récupérer le nom du projet
        const uploadId = uuidv4();
        const uploadPath = path.join(uploadsDir, uploadId);

        // Create directory for this upload
        fs.mkdirSync(uploadPath, { recursive: true });

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


        const projectName = req.body.projectName; // Récupérer le nom du projet
        const uploadPath = path.join(viewDir, projectName); // Utiliser le nom du projet pour le chemin

        // // Créer le dossier pour le projet
        fs.mkdirSync(uploadPath, { recursive: true });

        // Créer le dossier assets à l'intérieur du projet
        const assetsDir = path.join(uploadPath, 'assets');
        fs.mkdirSync(assetsDir, { recursive: true });

        const zipPath = path.join(uploadsDir, 'upload.zip');

        // Déplacer le fichier ZIP dans le dossier du projet
        fs.renameSync(req.file.path, zipPath);

        // Extraire le fichier ZIP dans le dossier assets
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(uploadPath, true); // Extraire dans le dossier assets

        // Supprimer le fichier ZIP original
        fs.unlinkSync(zipPath);

        // Copier tous les fichiers de /standalone vers /view/nomDuProjet/
        const standaloneDir = path.join(__dirname, 'standalone');
        fs.readdirSync(standaloneDir).forEach(file => {
            const sourcePath = path.join(standaloneDir, file);
            const destPath = path.join(uploadPath, file);
            fs.cpSync(sourcePath, destPath, { recursive: true }); // Copier les fichiers et dossiers
        });

        res.json({
            message: 'File uploaded, extracted, and files copied successfully',
            uploadId: projectName,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to process upload: ' + error.message });
    }
});

// // Add an endpoint to list all uploads
app.get('/list', (req, res) => {
    try {
        const uploads = fs.readdirSync(uploadsDir);
        res.json({ uploads });
    } catch (error) {
        console.error('Error listing uploads:', error);
        res.status(500).json({ error: 'Failed to list uploads' });
    }
});

// // Add a route to view uploaded files
// app.get('/view/:id', (req, res) => {
//     try {
//         const uploadId = req.params.id;
//         const uploadPath = path.join(uploadsDir, uploadId);

//         // Check if the upload directory exists
//         if (!fs.existsSync(uploadPath)) {
//             return res.status(404).json({ error: 'Upload not found' });
//         }

//         // Clean up the assets directory
//         fs.readdirSync(viewAssetsDir).forEach(file => {
//             fs.rmSync(path.join(viewAssetsDir, file), { recursive: true, force: true });
//         });

//         // Copy files from the upload directory to view/assets
//         fs.readdirSync(uploadPath).forEach(file => {
//             const sourcePath = path.join(uploadPath, file);
//             const destPath = path.join(viewAssetsDir, file);
//             fs.cpSync(sourcePath, destPath, { recursive: true });
//         });

//         // Redirect to the view page
//         res.redirect(`https://mmi22-16.mmi-limoges.fr/view/${uploadId}`);
//     } catch (error) {
//         console.error('Error copying files:', error);
//         res.status(500).json({ error: 'Failed to copy files: ' + error.message });
//     }
// });



const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
});
