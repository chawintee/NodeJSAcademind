const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.getLogin = (req,res,next) => {
    // const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true' || false
    // console.log(req.session.isLoggedIn);
    // console.log(req.session.user);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login', 
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.getSignup = (req,res,next) => {
    res.render('auth/signup', {
        path: '/singup',
        pageTitle: 'Signup', 
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postLogin = (req,res,next) => {
    const {email, password} = req?.body
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.redirect('/login')
        }
        bcrypt
        .compare(password,user.password)
        .then(doMatch => {
            if(doMatch){
                // console.log(user);
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save( err => {
                    console.log(err);
                    res.redirect('/')
                   })
            }
            res.redirect('/login')
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postSignup = (req,res,next) => {
    try {
        // console.log('PostSignUp');
        // console.log(req?.body);
        const {email, password,confirmPassword} = req?.body
        User.findOne({email})
        .then(userDoc => {
            if(userDoc){
                return res.redirect('/signup')
            }
            return bcrypt
                .hash(password,12)
                .then(hashPassword => {
                const user = new User({
                    email: email,
                    password: hashPassword, 
                    cart : {item : []}
                })
                return user.save()
            })
            .then(result => {
                res.redirect(301,'/login')
            })
        })
        .catch(err => {
            console.log(err)
        })
        // return res.redirect('/') if open make error
    } catch (error) {
        console.log(error);
    }
}



exports.postLogout = (req,res,next) => {
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/')
    })
}