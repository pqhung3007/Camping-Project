const Campground = require('../models/campground')
const { cloudinary } = require('../cloudinary') //*index is automatically detected => no need to indicate

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNew = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.createCampgrounds = async (req, res, next) => {
    //* when uploading, make an array contains url and filename
    const campground = new Campground(req.body.campground)
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id
    await campground.save()
    console.log(campground);
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

module.exports.uploadCamp = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);

    //*delete images in backend
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }

    await campground.save();
    req.flash('success', 'Successfully modify campground')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCamp = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Delete campground successfully')
    res.redirect('/campgrounds')
}