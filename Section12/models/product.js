const mongoConnect = require('../util/database')

class Product {
    constructor(title, price, imangeUrl, description){
        this.title = title,
        this.price = price,
        this.imageUrl = imangeUrl,
        this.description = description
    }

    save(){

    }
}


const Product = sequelize.define('product', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false, 
        autoIncrement: true,
        primaryKey : true,
    },
    title: {
        type : DataTypes.STRING,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull : false,
    },
    imageUrl : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull : false,
    }


});


module.exports = Product