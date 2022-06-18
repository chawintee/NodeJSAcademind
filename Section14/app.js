const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose')


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth")

const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const User = require('./models/user')

app.use((req,res,next)=> {
    User.findById("62aa0c353b983778483beec6")
    .then(user => {
        // console.log(user);
        req.user = user
        next()
    })
    .catch(err => {
        console.log(err)
    })
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)


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
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Max',
                email : 'max@test.co.th',
                cart : {items : []}
            })
            user.save()
            console.log("User created");
        }
    })
    app.listen(3000)
})
.catch(err => {
    console.log(err);
})