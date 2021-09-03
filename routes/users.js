const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res, next) => {
    //* ensure register info is unique
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)

        req.login(registeredUser, err => {
            if (err) {
                return next(err)
            }
        })
        req.flash('success', 'Welcome to YelpCamp')
        res.redirect('/campgrounds')
        // console.log(registeredUser);

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success', 'Goodbye!')
    res.redirect('/campgrounds')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    //* keep track of user's authentication (when requesting to edit, add) - 514
    const redirectUrl = req.session.returnTo || '/campgrounds'

    req.flash('success', 'Welcome back!')
    res.redirect(redirectUrl)
})

module.exports = router
