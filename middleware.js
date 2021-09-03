module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //* keep track of user's authentication (when requesting to edit, add)
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in')
        return res.redirect('/login')
    }
    next()
}