const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

class User {
    constructor(username, email, cart,id){
        this.name = username,
        this.email = email, 
        this.cart = cart, // {item: []}
        this._id = id
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
    }

    addToCart(product){
        // const cartProduct = this.cart.item.findIndex(cp => {
        //     return cp._id === product._id
        // })

        const db = getDb();
        const updatedCart = {item :[{...product, quantity: 1}]}
        return db.collection('users').updateOne({_id: ObjectId(this.id)}, {$set:{updatedCart}})
        
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