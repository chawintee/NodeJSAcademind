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
const User = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData);
app.use(shopRouter);

app.use(errorController.get404);

Product.belongsTo(User, {cosntraints: true, onDelete: 'CASCADE'})

sequelize
.sync({force: true})
// .sync()
.then(result => {
    // console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})
