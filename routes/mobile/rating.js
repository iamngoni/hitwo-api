const router = require("express").Router();
const Products = require("./../../models/products");

router.post("/", (req, res) => {
    var {id, rating, user_id} = req.body;
    Products.findById(id)
    .then(async(product) => {
        if(!product){
            return res.status(404).json({
                message: "product not found"
            });
        }
        var userExists = await Products.addRater(user_id);
        console.log(userExists);
        if(!userExists){
            var response = await product.updateRating(rating);
            if(response == "done"){
                product.rateProduct();
            }
            return res.status(200).json({
                message: "product rated"
            });
        }else{
            return res.status(401).json({
                message: "you already rated this product"
            });
        }
    })
});

module.exports = router;