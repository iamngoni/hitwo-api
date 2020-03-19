const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const Stores = require('./../../models/store');
const Products = require('./../../models/products');

if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
    console.warn('!! cloudinary config is undefined !!');
    console.warn('export CLOUDINARY_URL or set dotenv file');
} else {
    console.log('cloudinary config:');
    console.log(cloudinary.config());
}

router.post('/', (req, res) => {
    var {name, model, colors=[], size=null, price, category, storeId} = req.body;
    var image = req.file;
    var imageUrl = "";

    console.log(image);
    console.log(name);
    console.log(storeId);
    console
    Stores.findById(req.body.storeId).then((store) => {
        if(!store){
            console.log("Store doesn't exist");
            return res.status(404).json({
                message: "Store doesn't exist"
            });
        }
        cloudinary.uploader.upload(image, (err, result) => {
            if(err){
                return res.status(500).json({
                    message: "Failed to upload image"
                });
            }
            console.log(result);
        });
    }).catch(e => console.log(e));
});

module.exports = router;