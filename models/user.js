const mongoose = require('mongoose')
const passportLocMon = require('passport-local-mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    }
})

UserSchema.plugin(passportLocMon)

module.exports = mongoose.model('User', UserSchema)