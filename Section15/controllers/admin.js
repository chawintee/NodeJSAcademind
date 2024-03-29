const Product = require("../models/product");
const { validationResult } = require('express-validator');

const mongoose = require('mongoose')
const fileHelper = require('../util/file.js')

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    productsCSS: true,
    activeAddProducts: true,
    editing: false,
    hasError: false,
    errorMessage: null,
    validationError : []
  });
};

exports.postAddProduct = (req, res, next) => {
  // const title = req?.body?.title;
  // const imageUrl = req?.body?.imageUrl;
  // const price = req?.body?.price;
  // const description = req?.body?.description;
  console.log('user',req.user);
  // const { title, image:imageUrl, price, description } = req?.body;
  const { title, price, description } = req?.body;
  const image = req?.file
  console.log(image);
  if(!image){
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      productsCSS: true,
      activeAddProducts: true,
      editing: false,
      hasError: true, 
      product : { title, price, description },
      errorMessage : 'Attached file is not an image.',
      validationError : []
    });
  }
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors.array());
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      productsCSS: true,
      activeAddProducts: true,
      editing: false,
      hasError: true, 
      product : { title, imageUrl, price, description },
      errorMessage : errors.array()[0].msg,
      validationError : errors.array()
    });
  }
  // const _id = new mongoose.Types.ObjectId("62db7b211ff3cc2061c7a76a")
  const imageUrl = image?.path;
  const product = new Product({
    // _id,
    title, 
    price, 
    imageUrl , 
    description, 
    userId : req.user
    });
  product
    .save()
    .then((result) => {
      // console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      // console.log("An error occur !!!!!!");
      // return res.status(500).render("admin/edit-product", {
      //   pageTitle: "Add Product",
      //   path: "/admin/add-product",
      //   productsCSS: true,
      //   activeAddProducts: true,
      //   editing: false,
      //   hasError: true, 
      //   product : { title, imageUrl, price, description },
      //   errorMessage : 'Database operation failed, please try again.',
      //   validationError : []
      // });
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // console.log({prodId,editMode});
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      // throw Error('Dummy')
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product,
        hasError: false,
        errorMessage: null,
        validationError : []
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const {
    productId: prodId,
    title: updatedTitle,
    price: updatedPrice,
    // imageUrl: updatedImageUrl,
    description: updatedDesc,
  } = req.body;
  const image = req.file
  // console.log({prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice});

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors.array());
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      productsCSS: true,
      activeAddProducts: true,
      editing: true,
      hasError: true, 
      product : { title:updatedTitle,
        // imageUrl:updatedImageUrl,
        price:updatedPrice,
        description:updatedDesc,
        _id: prodId
       },
      errorMessage : errors.array()[0].msg,
      validationError : errors.array()
    });
  }


  Product.findById(prodId)
  .then(product => {
    if(product.userId.toString() !== req.user._id.toString()){
      return res.redirect('/')
    }
    product.title = updatedTitle;
    product.price = updatedPrice;
    if(image){
      fileHelper.deleteFile(product.imageUrl)
      product.imageUrl = image?.path;
    }
    product.description = updatedDesc;
    return product.save().then((result) => {
      // console.log(result);
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
  })
  .catch((err) => {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    if(!product){
      return next(new Error('Product not found.'))
    }
    fileHelper.deleteFile(product.imageUrl)
    return Product.deleteOne({_id: prodId, userId: req.user._id})
  }).then(() => {
    // console.log(result);
    console.log("DELETED PRODUCT!!!");
    res.redirect("/admin/products");
  })
  .catch((err) => {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
    
  // Product.deleteById(prodId)
  // res.redirect('/admin/products')
};

exports.getProducts = (req, res, next) => {
  Product.find({userId: req.user._id})
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      // console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Prodcuts",
        path: "/admin/products"
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product => {
    if(!product){
      return next(new Error('Product not found.'))
    }
    fileHelper.deleteFile(product.imageUrl)
    return Product.deleteOne({_id: prodId, userId: req.user._id})
  }).then(() => {
    // console.log(result);
    console.log("DELETED PRODUCT!!!");
    res.status(200).json({message: 'Success!'})
  })
  .catch((err) => {
    res.status(500).json({message: 'Deleting product failed. '})
  });
    
  // Product.deleteById(prodId)
  // res.redirect('/admin/products')
};