const path = require('path')

const rootDir = require('../util/path')

const express = require('express')

const router = express.Router()

const isAuth = require('../middlewear/is-auth')

const adminControllers = require('../controllers/admin')

// /admin/add-product => GET
router.get('/add-product', isAuth, adminControllers.getAddProduct)

// /admin/edit-product => GET
router.get('/edit-product/:productId', isAuth, adminControllers.getEditProduct)

// /admin/products => GET
router.get('/products', isAuth, adminControllers.getProducts)

// /admin/add-product => POST
router.post('/add-product', isAuth, adminControllers.postAddProduct)

router.post('/edit-product', isAuth, adminControllers.postEditProduct)

router.post('/delete-product', isAuth, adminControllers.postDeleteProduct)

module.exports = router