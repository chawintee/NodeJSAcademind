const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    price : {
        type : Number, 
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
})


// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, imangeUrl, description, id, userid) {
//     this.title = title,
//     this.price = price,
//     this.imageUrl = imangeUrl,
//     this.description = description,
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userid = userid
//   }

//   save() {
//     const db = getDb();
//     let dbOps;
//     if (this._id) {
//       dbOps = db.collection('products').updateOne({_id:this._id}, {$set: this})
//       //update
//     } else {
//       dbOps = db.collection("products").insertOne(this);
//     }

//     return dbOps
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb()
//     return db
//       .collection('products')
//       .deleteOne({_id: new mongodb.ObjectId(prodId)})
//       .then(result => {
//         console.log("Deleted");
//       })
//       .catch(err => {console.log(err)})

//   }
// }

// module.exports = Product;
