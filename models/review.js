const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    product_id: {
        type: Number, 
        ref: 'Product',
        required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
