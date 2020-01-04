const mongoose = require("mongoose");
const config = require('./../config');

async function connect(){
    if(config.env == 'development'){
        return mongoose.connect(config.db, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(dbconnection => dbconnection);
    }else if(config.env == 'production'){
        return mongoose.connect(config.db, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(dbconection => dbconnection);
    }else{
        console.log("This doesn't work");
    }
}

module.exports = async function(){
    await connect();
}

