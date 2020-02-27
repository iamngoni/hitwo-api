const router = require('express').Router();
const Store = require('./../../models/store');
const crypto = require('crypto');

router.post('/', (req, res) => {
    var { email, password } = req.body;
    Store.findOne({ email }).then((store) => {
        if (!store && !store.validatePassword(password)) {
            return res.status(401).json({
                message: 'Email or password don\'t match. Try again or create an account.'
            });
        }
        return res.status(200).json({
            name: store.name,
            address: store.address,
            latitude: store.latitude,
            longitude: store.longitude,
            email: store.email,
            phone: store.phone,
            message: "Store Authenticated Successfully"
        });  
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
    })
});

module.exports = router;