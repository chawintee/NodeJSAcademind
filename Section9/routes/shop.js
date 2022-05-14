const path = require('path')

const shopControllers = require('../controllers/shop')

const express = require('express')

const router = express.Router()

router.get('/', shopControllers.getIndex)

router.get('/products', shopControllers.getProducts)

router.get('/product/:productId',shopControllers.getProduct)

router.get('/cart', shopControllers.getCart)

router.post('/cart', shopControllers.postCart)

router.get('/orders', shopControllers.getOrders)

router.get('/checkout', shopControllers.getCheckout)

module.exports = router