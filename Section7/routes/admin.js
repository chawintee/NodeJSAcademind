const path = require('path')

const rootDir = require('../util/path')

const express = require('express')

const router = express.Router()

const productsControllers = require('../controllers/products')

// /admin/add-product => GET
router.get('/add-product', productsControllers.getAddProduct)

// /admin/add-product => POST
router.post('/add-product', productsControllers.postAddProduct)

module.exports = router