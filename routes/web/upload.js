const router = require('express').Router()
const Products = require('./../../models/products')
const path = require('path')
const fileUploader = require('express-fileupload')
const Images = require('./../../models/images')
const Stores = require('./../../models/store')
const fs = require('fs')

const file_path = './public/server-images'
router.use(fileUploader())

// using regex to test & upload files
const supportedFileTypes = [
  { fileType: 'image', fileTypeRegex: /image/ }
]

router.post('/', async (req, res) => {
  console.log('product upload process fired')
  var { name, model, colors = [], size = null, price, storeId, description, category } = req.body
  var nameOfFile = req.files.file.name
  var fileType = req.files.file.mimetype

  supportedFileTypes.forEach(file => {
    if (file.fileTypeRegex.test(fileType)) {
      console.log(`its an ${file.fileType}`)
      req.files.file.mv(`${path.resolve(file_path)}/` + nameOfFile, function (err) {
        if (err) {
          console.log(err)
          res.json({
            message: 'an error occured'
          })
        } else {
          var image = new Images()
          image.path = `${path.resolve(file_path)}/${nameOfFile}`
          image.save()
            .then((file) => {
              Stores.findById(storeId).then(store => {
                if (!store) {
                  return res.status(404).json({
                    message: 'store unknown'
                  })
                }
                var product_data = new Products()
                product_data.name = name
                product_data.model = model
                product_data.imageUrl = `http://192.168.43.213:8080/public/uploads/${file._id}`
                if (colors != []) {
                  product_data.colors = colors
                }
                if (size != null) {
                  product_data.size = size
                }
                product_data.price = price
                product_data.category = category
                product_data.description = description
                product_data.storeName = store.name
                product_data.storeId = store._id
                product_data.storeAddress = store.address
                product_data.storeLatitude = store.latitude
                product_data.storeLongitude = store.longitude
                product_data.save()
                  .then(product => {
                    if (!product) {
                      return res.status(500).json({
                        message: 'failed to upload product'
                      })
                    }
                    return res.status(200).json({
                      message: 'product upload complete',
                      image_url: product.imageUrl
                    })
                  }).catch(err => res.status(500).json({ message: 'failed to create product' }))
              })
            }).catch((err) => console.log(err))
        }
      })
    }
  })
})

module.exports = router
