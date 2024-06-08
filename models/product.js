const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_id: { 
        type: Number,
        unique: true 
    },
    product_name: {
        type: String,
        required: true 
    },
    price: { 
        type: Number,
        required: true 
    },
    has_discount: {
        type: Boolean,
        required: true 
    },
    discount_price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
