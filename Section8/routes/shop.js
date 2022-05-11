const path = require('path')

const productsControllers = require('../controllers/products')

const express = require('express')

const router = express.Router()

router.get('/', productsControllers.getProducts)

module.exports = router