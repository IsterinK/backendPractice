const mongoose = require('mongoose')
const address = require('./address.js')
const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    active: { type: Boolean,  default: true },
    avatar: { type: String, default: "https://www.iconarchive.com/download/i96797/iconsmind/outline/Post-Mail-2.ico",
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true },
    documentType: { type: String, require: true },
    identification: { type: String, require: true }
})

module.exports = mongoose.model("User", userSchema);