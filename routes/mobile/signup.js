const router = require('express').Router();
const Users = require('./../../models/users');
router.post('/', (req, res) => {
    var {username, email, password, mobileNumber} = req.body;
    const user = new Users();
    user.username = username;
    user.email = email;
    user.mobileNumber = mobileNumber;
    user.setPassword(password);
    user.setVerification(mobileNumber);

    user.save().then(currentUser => {
        return res.status(200).json({
            id: currentUser._id,
            username: currentUser.username,
            email: currentUser.email,
            mobileNumber: currentUser.mobileNumber,
            isVerified: currentUser.isVerified,
            likes: currentUser.likes
        });
    }).catch(e => {
        console.log(e);
        return res.status(500).json({
            message: 'Server error'
        });
    });
});

module.exports = router;
