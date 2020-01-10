const router = require('express').Router();
const messagebird = require('messagebird')('1havDyD2gjemhVWz7zmjxqkn0');
var Users = require('./../../models/users');

router.post('/get', (req, res) => {
    var {mobileNumber} = req.body;
    var otpCode = Math.floor(1000 + Math.random() * 9000);
    Users.findOneAndUpdate(
        {mobileNumber},
        {
            $set: {
                otp: otpCode
            }
        },
        (err, doc) => {
            const params = {
                'originator': '+263777213388',
                'recipients': [
                  `+263777213388`
                ],
                'body': `${otpCode}`
            };

            messagebird.messages.create(params, function (err, response) {
                if (err) {
                  return console.log(err);
                }
                console.log(response);
                res.json({
                    code: otpCode
                })
            });
        }
    );
});



















  


  module.exports = router;