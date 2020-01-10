const mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        uniquw: true
    },
    colors: {
        type: Array,
        default: ["white", "black"],
    },
    size: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Products', productsSchema);