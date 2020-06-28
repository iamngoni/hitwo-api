const router = require('express').Router()
const Images = require('./../models/images')
const path = require('path')

router.get('/uploads/:id', (req, res) => {
  console.log('retrieving image from database')
  var file_id = req.params.id
  Images.findById(file_id)
    .then(image => {
      var imagepath = path.resolve(image.path)
      res.sendFile(imagepath)
    }).catch(err => res.status(500).json({ message: 'error occured', error: err }))
})

module.exports = router
