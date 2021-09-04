//! error: Page not found, fix later (518,519,520)

const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')

const { validateReview } = require('../middleware')
const control = require('../controllers/conReviews')

router.post('/reviews', validateReview, catchAsync(control.createReview))

//*Section 468: pull s
router.delete('/:reviewId', catchAsync(control.deleteReview))

module.exports = router