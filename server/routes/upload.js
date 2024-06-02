const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configurar el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Ruta para cargar archivos
router.post('/', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully.');
});

module.exports = router;
