const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(require.main.filename), "data", "products.json")

const Cart = require('./cart')

const getProductsFromFile = cb => {
        fs.readFile(p, (err,fileContent)=>{
            if(err){
                cb([]) 
            }else{
                cb(JSON.parse(fileContent))
            }
        })
}

module.exports = class Product {
    constructor(id,title, imageUrl, description, price) {
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        if(this.id){
            getProductsFromFile(products => {
                const exitingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[exitingProductIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                })
            })
        }else{
            this.id = Math.random().toString()
            getProductsFromFile(products => {
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                })
            })
        }
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            const updateProducts = products.filter(prod => prod.id !== id)
            fs.writeFile(p,JSON.stringify(updateProducts),err => {
                if(!err){
                    console.log(null);
                    Cart.deleteProduct(id, product.price)
                }
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            // console.log({products});
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }
}