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

exports.postLogin = (req,res,next) => {
    User.findById(`62aa0c353b983778483beec6`)
    .then(user => {
        // console.log(user);
        req.session.isLoggedIn = true
        req.session.user = user
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postLogout = (req,res,next) => {
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/')
    })
}