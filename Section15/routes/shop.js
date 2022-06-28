const path = require('path')

const isAuth = require('../middlewear/is-auth')

const shopControllers = require('../controllers/shop')

const express = require('express')

const router = express.Router()

router.get('/', shopControllers.getIndex)

router.get('/products', shopControllers.getProducts)

router.get('/product/:productId',shopControllers.getProduct)

router.get('/cart' ,isAuth , shopControllers.getCart)

router.post('/cart',isAuth , shopControllers.postCart)

router.post('/cart-delete-item',isAuth , shopControllers.postCartDeleteProduct)

router.post('/create-order',isAuth ,shopControllers.postOrder)

router.get('/orders',isAuth , shopControllers.getOrders)

// router.get('/checkout', shopControllers.getCheckout)

module.exports = router