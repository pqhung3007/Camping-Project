const Review = require('../models/review')
const Campground = require('../models/campground')

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)

    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.flash('success', 'Created a new review')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    res.flash('success', 'Successfully delete a review')
    res.redirect(`/campgrounds/${id}`)
}