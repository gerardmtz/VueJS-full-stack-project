const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Counter = require('../models/counter');
const multer = require('multer');
const path = require('path');
const { getProduct, putProduct, upload, deleteProduct } = require('../controllers/products');

router.get('/product/:id?', getProduct);

router.put('/product/:id?', upload.single('file'), putProduct);

router.delete('/product/:id', deleteProduct);

module.exports = router;
