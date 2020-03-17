const router = require('express').Router();
const Users = require('./../../models/users');
const messagebird = require('messagebird')('EGtp0SNhNF1ee9XiZ4SfUc1NG');


router.post('/', (req, res) => {
    var {username, email, password, mobileNumber} = req.body;
    const user = new Users();
    user.username = username;
    user.email = email;
    user.mobileNumber = mobileNumber;
    user.setPassword(password);
    user.setVerification(mobileNumber);

    user.save().then(currentUser => {
        const params = {
            'originator': '263777213388',
            'recipients': [
                // `${currentUser.mobileNumber}`
                '263777213388'
            ],
            'body': `${currentUser.verificationToken}`
        };

        messagebird.messages.create(params, (err, response) => {
            if(err){
                return console.log(err);
            }
            console.log(response);
        })

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
    })
});

module.exports = router;
