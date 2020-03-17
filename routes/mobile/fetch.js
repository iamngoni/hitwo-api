const router = require('express').Router();
const Products = require('./../../models/products');

router.get('/', (req, res) => {
    Products.find().then((data) => {
        res.status(200).json({data});
    });
});

module.exports = router;