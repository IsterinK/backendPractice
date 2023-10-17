const { express } = require("express");
const {mongoose } = require("mongoose");
const postSchema = mongoose.Schema({
    title: {type: String, require: true},
    subtitle: {type: String, require: true},
    active: {type: Boolean, default: false},
    avatar: {type: String, default: "https://www.iconarchive.com/download/i96797/iconsmind/outline/Post-Mail-2.ico"},
    description: {type: String, require: true},
})

module.exports = mongoose.model("Post", postSchema)