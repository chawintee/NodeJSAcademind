const fs = require('fs')
const path = require('path')

const Product = require('../models/product')
const Order = require('../models/order');
const user = require('../models/user');
const product = require('../models/product');

const PDFDocument = require('pdfkit')

const ITEMS_PER_PAGE = 2

exports.getProducts = (req,res,next) => {
    const page = +req?.query?.page || 1
    let totalItems;
    Product.find()
    .countDocuments()
    .then(numProducts => {
        totalItems = numProducts;
        return  Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then(products => {
        // console.log(products);
        // console.log({page, ITEMS_PER_PAGE, totalItems});
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: "All Products", 
            path: "/products",
            csrfToken: req.csrfToken(),
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1, 
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        })
    })
    .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
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
        res.render('shop/product-detail', {
            product:product, 
            pageTitle: product.title, 
            path: "/products",
        })
    })
    .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
}

exports.getIndex = (req,res,next) => {
    let totalItems;
    const page = +req?.query?.page || 1
    Product.find()
    .countDocuments()
    .then(numProducts => {
        totalItems = numProducts;
        return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then(products => {
        // console.log(products);
        res.render('shop/index', {
            prods: products, 
            pageTitle: "Shop", 
            path: "/", 
            csrfToken: req.csrfToken(),
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1, 
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        })
    })
    .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
}

exports.getCart = (req,res,next) => {
    // console.log(req.user);
    req.user
    .populate('cart.items.productId')
    // .execPopulate()
    .then(user => {
            // console.log(user.cart.items);
            const products = user.cart.items
            res.render('shop/cart',{
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            })
    })
    .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
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
    .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  
   
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
        .catch((err) => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          });
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
                email : req.user.email,
                userId : req.user._id
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
    .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
}

exports.getOrders = (req,res,next) => {
    Order.find({'user.userId': req.user._id})
    .then(orders => {
        // console.log({orders});
        res.render('shop/orders',{
            path: '/orders',
            pageTitle: 'Your Orders',
            orders
        })
    })
    .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
}

exports.getCheckout = (req,res,next) => {
     // console.log(req.user);
     req.user
     .populate('cart.items.productId')
     // .execPopulate()
     .then(user => {
             // console.log(user.cart.items);
             const products = user.cart.items
             let total = 0;
             products.forEach(p => {
                total += p.quantity * p.productId.price
             })
             res.render('shop/checkout',{
                 path: '/checkout',
                 pageTitle: 'Checkout',
                 products: products,
                 totalSum: total
             })
     })
     .catch((err) => {
         console.log(err);
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
       });
}

exports.getInvoice = (req,res,next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
    .then(order => {
        if(!order){
            return next(new Error('No order found.'))
        }
        if(order.user.userId.toString() !== req.user._id.toString()){
            return next(new Error('Unauthorized'))
        }
        const invoiceName = "invoice-" + orderId + ".pdf";
        const invoicePath = path.join('data','invoices', invoiceName);

        //1
        // fs.readFile(invoicePath, (err, data)=> {
        //     if(err){
        //         return next(err);
        //     }
        //     res.setHeader('Content-Type', 'application/pdf');
        //     res.setHeader('Content-Disposition', `inline ; filename="${invoiceName}" `);
        //     res.send(data);
        // })

        //2
        // const file = fs.createReadStream(invoicePath)
        //     res.setHeader('Content-Type', 'application/pdf');
        //     res.setHeader('Content-Disposition', `inline ; filename="${invoiceName}" `);
        // file.pipe(res)

        //3
        const pdfDoc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline ; filename="${invoiceName}" `);
        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);
        pdfDoc.fontSize(25).text('Invoice');
        pdfDoc.text('-------------------------------------------')
        let totalPrice = 0
        order?.products?.forEach(prod => {
            totalPrice += prod?.quantity * prod?.product?.price
            pdfDoc.fontSize(18).text(`${prod?.product?.title} - ${prod?.quantity} * ${prod?.product?.price}` )
        })
        pdfDoc.text('-------------------------------------------')
        pdfDoc.fontSize(20).text(`Total Price : ${totalPrice}`)
        pdfDoc.end();
    })
    .catch(err => next(err))
}
    