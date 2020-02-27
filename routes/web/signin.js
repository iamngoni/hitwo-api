const router = require('express').Router();
const Store = require('./../../models/store');

router.post('/', (req, res) => {
    var { email, password } = req.body;
    Store.findOne({ email }).then((store) => {
        if (!store && !store.validatePassword(password)) {
            return res.status(401).json({
                message: 'Email or password don\'t match. Try again or create an account.'
            });
        }
        return res.status(200).json({
            message: 'Store Authenticated Successfully',
            name: store.name,
            email: store.contact.email,
            phone: store.contact.phone,
            address: store.address,
            latitude: store.location.latitude,
            longitude: store.location.longitude
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
    })
});

module.exports = router;