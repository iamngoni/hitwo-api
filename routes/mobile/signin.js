const router = require('express').Router();
const Users = require('./../../models/users');

router.post('/', (req, res) => {
    var {username, password} = req.body;
    Users.findOne({username}).then(user => {
        if(!user && !user.validatePassword(password)){
            return res.status(401).json({
                message: 'Username or password don\'t match. Try again or create an account.'
            });
        }
        return res.status(200).json({
            id: currentUser._id,
            username: user.username,
            email: user.email,
            mobileNumber: user.mobileNumber,
            isVerified: user.isVerified,
            likes: user.likes
        });
    }).catch(e => {
        console.log(e);
        return res.status(500).json({
            message: 'Server error. Try again'
        });
    });
});

// router.get('/mobile/:number', (req, res) => {
//     var number = req.params.number;
// });

module.exports = router;