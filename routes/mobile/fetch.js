const router = require('express').Router();
const Products = require('./../../models/products');

router.get('/', (req, res) => {
    Products.find().then((data) => {
        res.status(200).send(data);
    });
});

module.exports = router;