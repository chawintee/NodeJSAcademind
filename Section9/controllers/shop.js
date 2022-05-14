const Product = require('../models/product')

const  getProducts = (req,res,next) => {
    Product.fetchAll((products)=>{
        res.render('shop/product-list', {prods: products, pageTitle: "All Products", path: "/"})
    })
    // ...
}

const  getProduct = (req,res,next) => {
    const prodId = req.params.productId
    console.log({prodId});
    res.redirect('/')
    // ...
}

const getIndex = (req,res,next) => {
    Product.fetchAll((products)=>{
        res.render('shop/index', {prods: products, pageTitle: "Shop", path: "/"})
    })
}

const getCart = (req,res,next) => {
    res.render('shop/cart',{
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}

const getOrders = (req,res,next) => {
    res.render('shop/orders',{
        path: '/orders',
        pageTitle: 'Your Orders'
    })
}

const getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
        path:'/checkout',
        pageTitle: 'Checkout'
    })
}

module.exports = { getProducts, getIndex, getCart, getCheckout, getOrders, getProduct }