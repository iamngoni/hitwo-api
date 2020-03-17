const Users = require('./../../models/users');
const router = require('express').Router();

router.post('/:id', (req, res) => {
    var id = req.params.id;
    var {currentPassword, newPassword} = req.body;

    console.log(id);
    console.log(currentPassword);
    console.log(newPassword);
    Users.findById(id).then((user) => {
        if(!user){
            return res.status(404).json({
                message: "user with id not found"
            });
        }

        if(user.validatePassword(currentPassword)){
            user.setPassword(newPassword);
        }else{
            return res.status(403).json({
                message: "current password is wrong"
            });
        }
    })
});

module.exports = router;