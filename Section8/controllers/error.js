const get404 = (req,res,next) => {
    res.status(404).render('not-found', {pageTitle: "Page not Found", path:""})
}

module.exports = {get404}