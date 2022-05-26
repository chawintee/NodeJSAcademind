const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/error");

const sequelize = require("./util/database");

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next()
    })
    .catch(err => {
        console.log(err)
    })
})

app.use("/admin", adminData);
app.use(shopRouter);


app.use(errorController.get404);

Product.belongsTo(User, {cosntraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })


sequelize
// .sync({force: true})
.sync()
.then(result => {
    return User.findByPk(1)
}).then( user => {
    if(!user){
        return User.create({name:"Test", email: "test@test.com"})
    }
    return user
}).then(user => {
    // console.log(user);
    return user.createCart()
}).then(cart => {
    console.log(cart);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})
