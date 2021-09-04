const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const control = require('../controllers/conCamps')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware.js')

//* group routes together
router.route('/')
    .get(catchAsync(control.index))
    .post(isLoggedIn, validateCampground, catchAsync(control.createCampgrounds))

//*new must come before id, otherwise the new is treated as id => can't load the page
router.get('/new', isLoggedIn, control.renderNew)

router.route('/:id')
    .get(catchAsync(control.showUp))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(control.postModify))
    .delete(isLoggedIn, isAuthor, catchAsync(control.deletion))

//*2 routes: 1 for form, 1 for submitting
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(control.modifyCamp))

//*put must be installed with method-override

module.exports = router