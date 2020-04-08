const mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    colors: {
        type: Array,
        default: [],
    },
    size: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    rates_no: {
        type: Number,
        default: 0
    },
    user_rating: {
        type: Number,
        default: 0
    },
    persons: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now
    },
    storeName: {
        type: String
    },
    storeId: {
        type: String
    },
    storeAddress: {
        type: String
    },
    storeLatitude: Number,
    storeLongitude: Number,
    category: String,
    metadata: {
        type: Array,
        default: []
    },
    gallery: {
        type: Array,
        default: []
    },
    description: String
});

productsSchema.methods.rateProduct = function(){
    var denominator = this.rates_no * 5;
    var numerator = this.user_rating;
    this.rating = (numerator / denominator) * 5;
    console.log("product rated!");
}

productsSchema.methods.updateRating = function(rating){
    console.log("rating product");
    this.user_rating += rating;
    this.rates_no ++;
    return "done";
}

productsSchema.statics.addRater = async function(user_id, id){
    const product = await this.findById(id);
    console.log("done searching product");
    console.log(product);
    if(product){
        console.log("found out product exists. trying to update persons");
        if(!product.persons.includes(user_id)){
            var data = [];
            product.persons.forEach(element => {
                data.push(element);
            });
            data.push(user_id);
            await this.update({_id: id}, 
                {
                    $set: {
                        persons: data
                    }
                }
            );
            console.log("done adding user to persons list");
            return false;
        }else{
            console.log("failed to update persons. user_id already exists");
            return true;
        }
    }else{
        console.log("product is null");
    }
}

module.exports = mongoose.model('Products', productsSchema);
