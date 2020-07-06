const router = require('express').Router()
const Images = require('./../models/images')
const path = require('path')
const Categories = require('./../models/categories')
const auth = require('./auth')

router.get('/uploads/:id', (req, res) => {
  console.log('retrieving image from database')
  var file_id = req.params.id
  Images.findById(file_id)
    .then(image => {
      var imagepath = path.resolve(image.path)
      res.sendFile(imagepath)
    }).catch(err => res.status(500).json({ message: 'error occured', error: err }))
})

router.post('/categories', async (req, res) => {
  var { name, url } = req.body
  var cat = new Categories()
  cat.name = name
  cat.image = url
  var category = await cat.save()
  if (!category) {
    return res.status(501).json({ message: 'failed to save' })
  }
  return res.status(200).json({ message: 'category saved' })
})

router.get('/categories', auth.verifyToken, async (req, res) => {
  var categories = await Categories.find()
  if (!categories) {
    return res.status(404).json({})
  }
  return res.status(200).send(categories)
})

module.exports = router
