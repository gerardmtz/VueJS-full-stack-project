const express = require('express');
const router = express.Router();
const Counter = require('../models/counter');
const Review = require('../models/review');
const { putReview, deleteReview, getProductReview, getAverageProductReview } = require('../controllers/reviews');

async function getNextSequence(name) {
    const counter = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}

router.put('/review/:id?', putReview);

router.delete('/review/:id', deleteReview);

router.get('/review/:productId', getProductReview);

router.get('/reviews/average/:productId', getAverageProductReview);

module.exports = router;
