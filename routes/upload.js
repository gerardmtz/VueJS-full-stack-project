const express = require('express');
const router = express.Router();
const { upload, uploadFilesAndUpdateProduct } = require('../controllers/upload');

// Path to upload files and update the product with the image URL
router.post('/:id', upload.single('file'), uploadFilesAndUpdateProduct);

module.exports = router;
