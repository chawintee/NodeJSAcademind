const Product = require('../models/product')

const getAddProduct = (req,res,next) => {
    res.render('admin/add-product', {pageTitle:"Add Product", path: "/admin/add-product", productsCSS:true, activeAddProducts: true})
}

const postAddProduct = (req,res,next) => {
    const product = new Product(req?.body?.title)
    product.save()
    res.redirect('/')
}

const  getProducts = (req,res,next) => {
    Product.fetchAll((products)=>{
        res.render('shop/product-list', {prods: products, pageTitle: "Shop", path: "/", hasProducts: products.length > 0, activeShop: true})
    })
    // ...
}




module.exports = { getAddProduct ,postAddProduct ,getProducts }