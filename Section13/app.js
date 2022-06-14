const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose')


const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const User = require('./models/user')

// app.use((req,res,next)=> {
//     User.findById("629ff16fb0f2b334b4328816")
//     .then(user => {
//         console.log(user);
//         req.user = new User(user.name, user.email, user.cart, user._id)
//         next()
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

app.use("/admin", adminData);
app.use(shopRouter);


app.use(errorController.get404);

// mongoConnect(client => {
//     // console.log(client);
//     app.listen(3000);
// })

const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, `.env.${process.env.NODE_ENV}` )})


mongoose.connect(`${process.env.MONGODB_URL}`)
.then( result => {
    console.log("mongoDB connected");
    app.listen(3000)
})
.catch(err => {
    console.log(err);
})