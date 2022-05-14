const Product = require('../models/product')

const  getProducts = (req,res,next) => {
    Product.fetchAll((products)=>{
        res.render('shop/product-list', {prods: products, pageTitle: "All Products", path: "/products"})
    })
    // ...
}

const  getProduct = (req,res,next) => {
    const prodId = req.params.productId
    Product.findById(prodId, product => {
        // console.log({product});
        res.render('shop/product-detail', {product, pageTitle: product.title, path: "/products"})
    })
    // console.log({prodId});
    // res.redirect('/')
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