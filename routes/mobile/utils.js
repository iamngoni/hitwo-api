const router = require('express').Router();
var Users = require('../../models/users');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '397d74eb',
    apiSecret: 'Q3WfYlXJhTifEdf3'
});

router.get('/verify/:id/:token', (req, res) => {
    Users.findById(req.params.id).then((user) => {
        if(!user){
            return res.status(404).json({
                message: "Could not find user. Try registering"
            });
        }
        console.log(user);
        if(user.verificationToken == req.params.token){
            Users.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        isVerified: true
                    }
                },
                (err, doc) => {
                    if(!err){
                        console.log("Hurray");
                        return res.status(200).json({
                            isVerified: true
                        });
                    }else{
                        console.log("Errors happen all the time");
                    }
                }
            )
        }else{
            console.log("token string is wrong");
        }
    }).catch(e => console.log(e));
});

router.get('/get_token/:number', (req, res) => {
    const number = req.params.number;

    const from = 'iamngoniapps';
    const to = `${number}`;
    var text = "";

    Users.findOne({mobileNumber: number}).then((user) => {
        if(!user){
            return res.status(404).json({
                message: "Mobile number not found"
            });
        }
        text = `Product Locator Verification Code: ${user.verificationToken} \n`;
        nexmo.message.sendSms(from, to, text, (err, response) => {
            if(err){
                return console.log(`messaging error! ${err}`);
            }else{
                if(response.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                    return res.status(200).json({
                        status: true
                    });
                } else {
                    console.log(`Message failed with error: ${response.messages[0]['error-text']}`);
                    return res.status(500).json({
                        status: false
                    });
                }
            }
        });
    }).catch(e => console.log(e));
});

module.exports = router;