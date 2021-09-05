//! error: Page not found, fix later (518,519,520)

const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const Review = require('../models/review')
const { validateReview, isLoggedIn } = require('../middleware')
const control = require('../controllers/conReviews')

router.post('/reviews', isLoggedIn, validateReview, catchAsync(control.createReview))

//*Section 468: pull s
router.delete('/:reviewId', isLoggedIn, catchAsync(control.deleteReview))

module.exports = router