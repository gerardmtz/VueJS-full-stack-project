const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const uploadFilesAndUpdateProduct = async (req, res) => {
    const productId = req.params.id;
    const filePath = req.file.path;

    try {
        const product = await Product.findOneAndUpdate(
            { product_id: productId },
            { image_url: filePath },
            { new: true }
        );

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.send(product);
    } catch (err) {
        res.status(500).send('Error updating product with image: ' + err.message);
    }
}

module.exports = {
    upload,
    uploadFilesAndUpdateProduct
}
