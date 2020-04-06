const mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    model: {
        type: String,
        required: true,
        lowercase: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    colors: {
        type: Array,
        default: [],
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
    storeName: {
        type: String
    },
    storeId: {
        type: String
    },
    storeAddress: {
        type: String
    },
    storeLatitude: Number,
    storeLongitude: Number,
    category: String,
    metadata: {
        type: Array,
        default: []
    },
    gallery: {
        type: Array,
        default: []
    },
    description: String
});

module.exports = mongoose.model('Products', productsSchema);
