const Campground = require('../models/campground')

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNew = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.createCampgrounds = async (req, res, next) => {
    const campground = new Campground(req.body.campground)
    campground.author = req.user._id
    await campground.save()
    req.flash('success', 'Successfully create a new campground')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showUp = async (req, res) => {
    const campground = await (await Campground.findById(req.params.id).populate('reviews').populate('author'))
    //* post-deletion of a campground
    if (!campground) {
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
}

module.exports.modifyCamp = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground })
}
module.exports.postModify = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully modify campground')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deletion = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Delete campground successfully')
    res.redirect('/campgrounds')
}