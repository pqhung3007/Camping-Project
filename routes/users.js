const express = require('express')
const passport = require('passport')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const control = require('../controllers/conUsers')

router.route('/register')
    .get(control.renderRegister)
    .post(catchAsync(control.register))

router.route('/login')
    .get(control.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), control.login)

router.get('/logout', control.logout)


module.exports = router
