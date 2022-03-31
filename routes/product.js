
const Product = require('../models/Product')
const router = require('express').Router()
const {verifyAdmin} = require('./verifyToken')

router.post('/', verifyAdmin,  async (req, res) => {
  const newProduct = new Product(req.body) 
  try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (e) {
    res.status(500).json(e)
  }
})

module.exports = router 