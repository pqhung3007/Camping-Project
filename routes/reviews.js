//! error: Page not found, fix later (518,519,520)

const express = require('express')
const router = express.Router({ mergeParams: true })
const Review = require('../models/review')
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')

const { validateReview } = require('../middleware')

router.post('/reviews', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)

    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.flash('success', 'Created a new review')
    res.redirect(`/campgrounds/${campground._id}`)
}))

//*Section 468: pull s
router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    res.flash('success', 'Successfully delete a review')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router