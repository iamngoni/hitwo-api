const mongoose = require("mongoose");

var images = mongoose.Schema({
    path: String
});

module.exports = mongoose.model("Images", images);