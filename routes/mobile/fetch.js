const router = require('express').Router();
const Products = require('../../models/products');

router.get('/', (req, res) => {
    Products.find()
        .then((data) => {
            if(!data){
                return res.status(404).json({
                    message: 'No products yet'
                });
            }
            res.status(200).json(data);
        }).catch(err => console.log(err));
});

router.get('/search/:query', async(req, res) => {
    console.log('reached search route');
    var searchQuery = req.params.query.toLowerCase();
    var byName = await searchByName(searchQuery);
    var byModel = searchByModel(searchQuery);
    var byStoreName = searchByStoreName(searchQuery);
    var searchByCat = searchByCategory(searchQuery);

    var rawData = [];
    // console.log(byName);
});

var searchByName = (name) => {
    Products.find({name: name})
        .then((data) => {
            if(data.length == 0){
                console.log("no data by name");
                return [];
            }else{
                console.log(data);
                return data;
            }
        }).catch((e) => {
            console.log(e.message);
            return [];
        });
};

var searchByModel = (model) => {
    Products.find({model})
        .then((data) => {
            if(!data){
                console.log("no data by model");
                return [];
            }else{
                return data;
            }
        }).catch((e) => {
            console.log(e.message);
            return [];
        });
};

var searchByStoreName = (storeName) => {
    Products.find({storeName})
        .then((data) => {
            if(!data){
                console.log("no data by storeName");
                return [];
            }else{
                return data;
            }
        }).catch((e) => {
            console.log(e.message);
            return [];
        });
};

var searchByCategory = (category) => {
    Products.find({category})
        .then((data) => {
            if(!data){
                console.log("no data found by category");
                return [];
            }else{
                return data;
            }
        }).catch((e) => {
            console.log(e.message);
            return [];
        });
};

module.exports = router;
