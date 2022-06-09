const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

class User {
    constructor(username, email, cart,id){
        this.name = username,
        this.email = email, 
        this.cart = cart, // {items: []}
        this._id = id
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
    }

    addToCart(product){
        const cartProductIndex = this?.cart?.items?.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        })
        let newQuatity = 1
        const updatedCartItems = this?.cart?.items ? [...this.cart.items] : []
        if(cartProductIndex >= 0){
            newQuatity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItems[cartProductIndex].quantity = newQuatity
        }else{
            updatedCartItems.push({productId : new ObjectId(product?._id), quantity: newQuatity})
        }
        const db = getDb();
        const updatedCart = {items :updatedCartItems}
        return db
        .collection('users')
        .updateOne(
            {_id: new ObjectId(this._id)}, 
            {$set: {cart : updatedCart}}
            )
    }

    deleteItemFromCart(productId){
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString()
        })
        const db = getDb();
        return db.collection('users').updateOne({_id: new ObjectId(this._id)}, {$set: {cart : {items:updatedCartItems} }})
    }

    getCart(){
        const db = getDb()
        const productIds = this.cart.items.map(i => {
            return i.productId
        })
        return db
            .collection('products')
            .find({_id: {$in: productIds}})
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {...p, quantity : this.cart.items.find(i =>{
                        return i.productId.toString() === p._id.toString()}
                        ).quantity
                    }
                })
            })
    }

    static findById(userId){
        const db = getDb()
        return db.collection('users').findOne({_id: new ObjectId(userId)})
        .then(user => {
            console.log(user);
            return user
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = User