const express = require('express');
const Product = require('../models/product');
const Counter = require('../models/counter');
const multer = require('multer');
const path = require('path');

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });


// Controllers for product routes
const getProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        if (productId) {
            // if is getting queried and specific product
            const product = await Product.findOne({ product_id: productId });
            if (!product) {
                return res.status(404).send('Product not found');
            }
            return res.send(product);
        } else {
            // If the product is not specified, all the products are retrieved:
            const products = await Product.find();
            return res.send(products);
        }
    } catch(err) {
        return res.status(500).send('Error getting the product(s): ' + err.message);
    }
}

// Getting the next id for product
async function getNextSequence(name) {
    const counter = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}

const putProduct = async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    if (req.file) {
        productData.image_url = path.join('uploads', req.file.filename);
    }

    try {
        if (productId) {
            // Update existent product
            const updatedProduct = await Product.findOneAndUpdate({ product_id: productId }, productData, { new: true });
            if (!updatedProduct) {
                return res.status(404).send('Product not found');
            }
            return res.status(200).send(updatedProduct);
        } else {
            // Register new product
            const newProductId = await getNextSequence('productid');
            const newProduct = new Product({
                product_id: newProductId,
                ...productData
            });
            await newProduct.save();
            return res.status(201).send(newProduct);
        }
    } catch (err) {
        return res.status(500).send('Error processing request: ' + err.message);
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findOne({ product_id: productId });
        if (!product) {
            return res.status(404).send('Product not found');
        }

        await Product.findOneAndDelete({ product_id: productId });
        return res.send({ message: 'Product successfully deleted' });
    } catch(err) {
        return res.status(500).send('Error deleting the product: ' + err.message);
    }
}


module.exports = {
    getProduct,
    putProduct,
    upload,
    deleteProduct
}