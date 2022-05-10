const getError = (req,res,next) => {
    res.status(404).render('not-found', {pageTitle: "Page not Found", path:""})
}

module.exports = {getError}