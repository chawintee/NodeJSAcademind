const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    productsCSS: true,
    activeAddProducts: true,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  // const title = req?.body?.title;
  // const imageUrl = req?.body?.imageUrl;
  // const price = req?.body?.price;
  // const description = req?.body?.description;
  console.log('user',req.user);
  const { title, imageUrl, price, description } = req?.body;
  const product = new Product({title, price, imageUrl, description, userId : req.user});
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
        product
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
  Product.findById(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save()
  })
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
  Product.findByIdAndDelete(prodId)
    .then(() => {
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
  Product.find()
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
    .catch(err => {
      console.log(err);
    });
};
