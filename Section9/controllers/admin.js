const { redirect } = require('express/lib/response')
const Product = require('../models/product')

const getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {pageTitle:"Add Product", path: "/admin/add-product", productsCSS:true, activeAddProducts: true, editing:false})
}

const postAddProduct = (req,res,next) => {
    // const title = req?.body?.title;
    // const imageUrl = req?.body?.imageUrl;
    // const price = req?.body?.price;
    // const description = req?.body?.description;
    const {title,imageUrl,price,description} = req?.body
    const product = new Product(title,imageUrl,description,price)
    product.save()
    res.redirect('/')
}

const getEditProduct = (req,res,next) => {
    const editMode = req.query.edit
    if(!editMode){
        return res.redirect('/')
    }
    const prodId = req.params.productId
    // console.log({prodId,editMode});
    Product.findById(prodId, product => {
        if(product){
            res.render('admin/edit-product', {
                pageTitle:"Edit Product", 
                path: "/admin/edit-product",
                editing: editMode,
                product,
                })
        }
    })
}

const getProducts = (req,res,next) => {
    Product.fetchAll((products)=>{
        res.render('admin/products', {prods: products, pageTitle: "Admin Prodcuts", path: "/admin/products"})
    })
}

module.exports = {getAddProduct, postAddProduct, getProducts, getEditProduct}