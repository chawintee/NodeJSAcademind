const path = require('path')

const rootDir = require('../util/path')

const express = require('express')

const router = express.Router()

const adminControllers = require('../controllers/admin')

// /admin/add-product => GET
router.get('/add-product', adminControllers.getAddProduct)

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminControllers.getEditProduct)

// /admin/products => GET
router.get('/products', adminControllers.getProducts)

// /admin/add-product => POST
router.post('/add-product', adminControllers.postAddProduct)

module.exports = router