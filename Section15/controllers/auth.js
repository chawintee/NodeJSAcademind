const path = require("path");

const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname ,'..', `.env.${process.env.NODE_ENV}` )})

const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const mailer = nodemailer.createTransport(sendgridTransport({
     auth : {
        api_key: `${process.env.API_KEY}`
     }
}))

const { validationResult } = require('express-validator')

const crypto = require('crypto')

const User = require('../models/user')

exports.getLogin = (req,res,next) => {
    // const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true' || false
    // console.log(req.session.isLoggedIn);
    // console.log(req.session.user);
    // console.log(req.flash('error'));
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }else{
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message,
        oldInput : {
            email: '',
            password: ''
        },
        validationErrors: []
    })
}

exports.getSignup = (req,res,next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }else{
        message = null;
    }
    res.render('auth/signup', {
        path: '/singup',
        pageTitle: 'Signup',
        errorMessage: message,
        oldInput: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationErrors: []
    })
}

exports.postLogin = (req,res,next) => {
    const {email, password} = req?.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // console.log(errors.array())
        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email,
                password
            },
            validationErrors : errors.array()
        })
    }
    User.findOne({email})
    .then(user => {
        // if(!user){
        //     req.flash('error', 'Invalid email or password.')
        //     return res.redirect('/login')
        // }
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
            req.flash('error', 'Invalid email or password.')
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
        // console.log('PostSignUp');
        // console.log(req?.body);
        const {email, password,confirmPassword} = req?.body
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // console.log(errors.array());
            return res.status(422).render('auth/signup', {
                path: '/singup',
                pageTitle: 'Signup',
                errorMessage: errors.array()[0].msg,
                oldInput: {
                    email,
                    password,
                    confirmPassword,
                },
                validationErrors: errors.array()
            })
        }

            bcrypt
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
                // return mailer.sendMail({
                //     to: email,
                //     from: 'chocolate_co_@hotmail.com',
                //     subject: 'Singup succeeded!',
                //     html : '<h1>You successfully signed up! </h1>'
                // })
            })
            .catch(err => {
                console.log(err);
            })
        // return res.redirect('/') if open make error
}



exports.postLogout = (req,res,next) => {
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/')
    })
}


exports.getReset = (req,res,next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }else{
        message = null;
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
    })
}

exports.postReset = (req,res,next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                req.flash('error', 'No account with that email found.')
                return res.redirect('/reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save()
        })
        .then(result => {
            res.redirect('/')
            mailer.sendMail({
                to: req.body.email,
                from: 'chocolate_co_@hotmail.com',
                subject: 'Password reset',
                html : `
                 <p>You requested a password reset </p>
                 <p>Click this <a href="http://localhost:3000/reset/${token}>link</p> to set a new password </p>
                `
            })
        })
        .catch(err => {
            console.log(err);
        })
    })

}


exports.getNewPassword = (req,res,next) => {
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
    .then(user => {
        let message = req.flash('error');
        if(message.length > 0){
            message = message[0];
        }else{
            message = null;
        }
        res.render('auth/new-password', {
            path: '/new-password',
            pageTitle: 'New Password',
            errorMessage: message,
            userId: user._id.toString(),
            passwordToken: token
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    User.findOne({
        resetToken: passwordToken,
        resetTokenExpiration: {$gt: Date.now()},
        _id: userId
    })
    .then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword,12);
    })
    .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
    })

}