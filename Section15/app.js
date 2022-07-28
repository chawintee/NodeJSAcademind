const path = require("path");

const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, `.env.${process.env.NODE_ENV}` )})

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf')
const flash = require('connect-flash')
const multer = require('multer')

const app = express();
const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: 'sessions'
});
const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    } , 
    filename : (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

app.set("view engine", "ejs");
app.set("views", "views");

// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose')


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth")

const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage: fileStorage }).single('image'))
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret:"my secret", resave: false, saveUninitialized:false, store: store}))
app.use(csrfProtection)
app.use(flash())

const User = require('./models/user');
const { collection } = require("./models/user");

app.use((req,res,next)=> {
    res.locals.isAuthenticated = req.session.isLoggedIn 
    res.locals.csrfToken = req.csrfToken()
    next();
})

app.use((req,res,next)=> {
    // console.log("***************************************************************",req.session.user);
    // throw new Error('Sync Dummy')
    if(!req?.session?.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        if(!user){
            return next()
        }
        // console.log(user);
        req.user = user;
        next();
    })
    .catch(err => {
        next(new Error(err))
    })
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)


app.use('/500', errorController.get500);
app.use(errorController.get404);

app.use((error, req, res, next)=> {
    // res.status(error.httpStatusCode).render(...)
    // res.redirect('/500')
    res.status(500).render('500', {
        pageTitle: "Error!", 
        path:"/500", 
        isAuthenticated: req.session.isLoggedIn
    })
})

// mongoConnect(client => {
//     // console.log(client);
//     app.listen(3000);
// })



mongoose.connect(`${process.env.MONGODB_URL}`)
.then( result => {
    console.log("mongoDB connected");
    // User.findOne().then(user => {
    //     if(!user){
    //         const user = new User({
    //             name: 'Max',
    //             email : 'max@test.co.th',
    //             cart : {items : []}
    //         })
    //         user.save()
    //         console.log("User created");
    //     }
    // })
    app.listen(3000)
})
.catch(err => {
    console.log(err);
})