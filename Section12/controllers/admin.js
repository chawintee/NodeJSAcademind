const { redirect } = require("express/lib/response");
const Product = require("../models/product");
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    productsCSS: true,
    activeAddProducts: true,
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  // const title = req?.body?.title;
  // const imageUrl = req?.body?.imageUrl;
  // const price = req?.body?.price;
  // const description = req?.body?.description;
  const { title, imageUrl, price, description } = req?.body;
  const product = new Product(title, price, imageUrl, description);
  product
    .save()
    .then((result) => {
      // console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
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
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const {
    productId: prodId,
    title: updatedTitle,
    price: updatedPrice,
    imageUrl: updatedImageUrl,
    description: updatedDesc,
  } = req.body;
  // console.log({prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice});
  const product = new Product(updatedTitle,updatedPrice,updatedImageUrl,updatedDesc, new ObjectId(prodId))
  product.save()
    .then((result) => {
      // console.log(result);
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      // console.log(product);
      return product.destroy();
    })
    .then((result) => {
      // console.log(result);
      console.log("DELETED PRODUCT!!!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.deleteById(prodId)
  // res.redirect('/admin/products')
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Prodcuts",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
