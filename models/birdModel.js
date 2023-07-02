const mongoose = require('mongoose')

const birdSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFood: String,
    funFact: String,
    image: String
})

module.exports = mongoose.model('Bird', birdSchema)