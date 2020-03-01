const router = require('express').Router();
const Products = require('../../models/products');
const utils = require('./utils');

router.get('/', utils.validateToken, (req, res) => {
    const payload = req.decoded;
    console.log(payload);
    Products.find()
        .then((data) => {
            if(!data){
                return res.status(404).json({
                    message: 'No products yet'
                });
            }
            res.status(200).json(data);
        }).catch(err => console.log(err));
});

module.exports = router;