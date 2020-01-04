const mongoose = require('mongoose');
const crypto = require('crypto');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    mobileNumber: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    likes: Array,
    verificationToken: String,
    hash: String,
    salt: String,
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash; 
};

userSchema.methods.setVerification = function(mobileNumber){
    var theString = mobileNumber.slice(3, 7);
    this.verificationToken = theString;
}

module.exports = mongoose.model('Users', userSchema);