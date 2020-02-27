const router = require('express').Router();
const Store = require('./../../models/store');

router.post('/', (req, res) => {
    var { name, address, latitude, longitude, email, phone, password} = req.body;
    var shop = new Store();
    shop.name = name;
    shop.address = address;
    shop.location.latitude = latitude;
    shop.location.longitude = longitude;
    shop.contact.email = email;
    shop.contact.phone = phone;

    shop.setPassword(password);
    shop.setVerification();

    shop.save().then((response) => {
        if (!response) {
            return res.status(500).json({
                message: 'Empty Response'
            });
        }
        return res.status(200).json({
            message: `Store Created With Id: ${response._id}`
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Message Error'
        });
    })
});

module.exports = router;