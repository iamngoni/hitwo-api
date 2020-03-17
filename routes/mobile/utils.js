const router = require('express').Router();
const messagebird = require('messagebird')('1havDyD2gjemhVWz7zmjxqkn0');
var Users = require('../../models/users');

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
                            message: "Verified"
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

module.exports = router;