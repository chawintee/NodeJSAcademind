const path = require('path')

const shopControllers = require('../controllers/shop')

const express = require('express')

const router = express.Router()

router.get('/', shopControllers.getIndex)

router.get('/products', shopControllers.getProducts)

router.get('/cart', shopControllers.getCart)

router.get('/orders', shopControllers.getOrders)

router.get('/checkout', shopControllers.getCheckout)

module.exports = router