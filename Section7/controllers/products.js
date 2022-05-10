const products = []

const getAddProduct = (req,res,next) => {
    res.render('add-product', {pageTitle:"Add Product", path: "/admin/add-product", productsCSS:true, activeAddProducts: true})
}

const postAddProduct = (req,res,next) => {
    // console.log(req.body);
    products.push({'title': req?.body?.title})
    res.redirect('/')
}

const  getProducts = (req,res,next) => {
    res.render('shop', {prods: products, pageTitle: "Shop", path: "/", hasProducts: products.length > 0, activeShop: true})
    // ...
}




module.exports = { getAddProduct ,postAddProduct ,getProducts }