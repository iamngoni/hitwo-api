const router = require('express').Router();
const Products = require('./../models/products');

router.get('/', (req, res) => {
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