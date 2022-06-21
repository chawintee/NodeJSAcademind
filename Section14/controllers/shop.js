const Product = require('../models/product')
const Order = require('../models/order');
const user = require('../models/user');
const product = require('../models/product');


exports.getProducts = (req,res,next) => {
    Product.find()
    .then(products => {
        console.log(products);
        res.render('shop/product-list', {prods: products, pageTitle: "All Products", path: "/products" , isAuthenticated: req.session.isLoggedIn})
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId
    // Product.findAll({where:{id: prodId}})
    // .then(product => {
    //     console.log(product);
    //     res.render('shop/product-detail', {product:product[0], pageTitle: product[0].title, path: "/products"})
    // })
    // .catch(err => {
    //     console.log(err)
    // })

    Product.findById(prodId)
    .then(product => {
        // console.log(product);
        res.render('shop/product-detail', {product:product, pageTitle: product.title, path: "/products", isAuthenticated: req.session.isLoggedIn})
    })
    .catch(err=> {
        console.log(err);
    })
}

exports.getIndex = (req,res,next) => {
    Product.find()
    .then(products => {
        // console.log(products);
        res.render('shop/index', {prods: products, pageTitle: "Shop", path: "/", isAuthenticated: req.session.isLoggedIn})
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getCart = (req,res,next) => {
    req.user
    .populate('cart.items.productId')
    // .execPopulate()
    .then(user => {
            // console.log(user.cart.items);
            const products = user.cart.items
            res.render('shop/cart',{
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products, 
                isAuthenticated: req.session.isLoggedIn
            })
    })
    .catch(err=> {
        console.log(err)
    })
}

exports.postCart = (req,res,next) => {
    const prodId = req.body.productId
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product)
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
    })
  
   
    // let fetchedCart
    // let newQuantity = 1 ;
    // req.user.getCart()
    // .then(cart => {
    //     // console.log("$$$", cart);
    //     fetchedCart = cart
    //     return cart.getProducts({where :{id: prodId}})
    // })
    // .then(products => {
    //     // console.log("***",products);
    //     let product;
    //     if(products.length > 0){
    //         product = products[0]
    //     }
    //     if(product){
    //         const oldQuantity = product.cartItem.quantity
    //         newQuantity = oldQuantity +1
    //         return product
    //     }
    //     return Product.findByPk(prodId)
    // })
    // .then(product => {
    // return fetchedCart.addProduct(product, {through : {quantity :newQuantity}})
    // })
    // .then(()=>{
    //     res.redirect('/cart')
    // })
    // .catch(err => {
    //     console.log(err)
    // })
}

exports.postCartDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postOrder = (req,res,next) => {
    
    let fetchedCart;
    req.user
    .populate('cart.items.productId')
    // .execPopulate()
    .then(user => {
        const products = user.cart.items.map(i => {
            return {quantity: i.quantity,product: {...i.productId._doc} }
        })
        console.log({products});
        const order = new Order({
            user: {
                name : req.user.name,
                userId : req.user
            },
            products :products
        })
        // console.log(user.cart.items);
        return order.save()
    })
    .then(result => {
        req.user.clearCart()
    })
    .then(()=> {
        res.redirect('/orders')
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req,res,next) => {
    Order.find({'user.userId': req.user})
    .then(orders => {
        // console.log({orders});
        res.render('shop/orders',{
            path: '/orders',
            pageTitle: 'Your Orders',
            orders, 
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch(err => console.log(err))
}

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
        path:'/checkout',
        pageTitle: 'Checkout', 
        isAuthenticated: req.session.isLoggedIn
    })
}
