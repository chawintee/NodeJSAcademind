exports.getLogin = (req,res,next) => {
    // const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true' || false
    console.log(req.session.isLoggedIn);
    console.log(req.session.user);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login', 
        isAuthenticated: false
    })
}

exports.postLogin = (req,res,next) => {
    req.session.user = "62aa0c353b983778483beec6"
    req.session.isLoggedIn = true
    res.redirect('/')
}