exports.get404 = (req,res,next) => {
    res.status(404).render('not-found', {pageTitle: "Page not Found", path:"/404", isAuthenticated: req.session.isLoggedIn})
}

exports.get500 = (req,res,next) => {
    res.status(500).render('500', {pageTitle: "Page not Found", path:"/500", isAuthenticated: req.session.isLoggedIn})
}