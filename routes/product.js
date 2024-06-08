const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Counter = require('../models/counter');

// Route to get a single product
router.get('/product/:id?', async (req, res) => {
    const productId = req.params.id;

    try {
        if (productId) {
            const product = await Product.findOne({ product_id: productId });
            if (!product) {
                return res.status(404).send('Product not found');
            }
            return res.send(product);
        } else {
            const products = await Product.find();
            return res.send(products);
        }
    } catch(err) {
        return res.status(500).send('Error getting the product(s): ' + err.message);
    }
});

// Route to register a single product
router.post('/register', async (req, res) => {
    const { product_name, price, has_discount, discount_price } = req.body;

    const newProduct = new Product({
        product_name,
        price,
        has_discount,
        discount_price
    });

    try {
        await newProduct.save();
        res.status(200).send(newProduct);
    } catch (err) {
        res.status(500).send('Error registering new product: ' + err.message);
    }
});

// Getting the next id for product
async function getNextSequence(name) {
    const counter = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}

// Routes for registrer and update a product
router.put('/product/:id?', async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    try {
        if (productId) {
            const updatedProduct = await Product.findOneAndUpdate({ product_id: productId }, productData, { new: true });
            if (!updatedProduct) {
                return res.status(404).send('Product not found');
            }
            return res.status(200).send('Product updated successfully');
        } else {
            const newProductId = await getNextSequence('productid');
            const newProduct = new Product({
                product_id: newProductId,
                ...productData
            });
            await newProduct.save();
            return res.status(201).send('Product registered successfully');
        }
    } catch (err) {
        return res.status(500).send('Error processing request: ' + err.message);
    }
});

router.delete('/product/:id', async (req, res) => {
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
});

module.exports = router;
