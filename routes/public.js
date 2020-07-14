const router = require('express').Router()
const Categories = require('./../models/categories')
const auth = require('./auth')

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
