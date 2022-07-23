const path = require('path')

const rootDir = require('../util/path')

const express = require('express')

const router = express.Router()

const isAuth = require('../middlewear/is-auth')
const {body} = require('express-validator')


const adminControllers = require('../controllers/admin')

// /admin/add-product => GET
router.get('/add-product', isAuth, adminControllers.getAddProduct)

// /admin/edit-product => GET
router.get('/edit-product/:productId', isAuth, adminControllers.getEditProduct)

// /admin/products => GET
router.get('/products', isAuth, adminControllers.getProducts)

// /admin/add-product => POST
router.post(
    '/add-product', 
    [
        body('title').isString().isLength({min:3}),
        body('imageUrl').isURL(),
        body('price').isFloat(),
        body('description').isString().isLength({min:8}),
    ]
    ,  isAuth
    , adminControllers.postAddProduct)

router.post('/edit-product', isAuth, adminControllers.postEditProduct)

router.post('/delete-product', isAuth, adminControllers.postDeleteProduct)

module.exports = router