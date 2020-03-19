const router = require('express').Router();
const Store = require('./../../models/store');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    var { email, password } = req.body;
    Store.findOne({ email }).then((store) => {
        if (!store && !store.validatePassword(password)) {
            return res.status(401).json({
                message: 'Email or password don\'t match. Try again or create an account.'
            });
        }

        const payload = { id: store._id };
        const options = { expiresIn: '2d', issuer: 'https://hitwo-api.herokuapp.com' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options);

        return res.status(200).json({
            name: store.name,
            address: store.address,
            latitude: store.latitude,
            longitude: store.longitude,
            email: store.email,
            phone: store.phone,
            token: token,
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