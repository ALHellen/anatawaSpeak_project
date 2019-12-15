const mongoose = require('mongoose')
const Schema = mongoose.Schema

const learnedWordsSchema = new Schema({
    word: { type: String, required: true},
    language: { type: String},
    insertDate: { type: String}
})

const learnedWordsModel = mongoose.model('learnedWords', learnedWordsSchema)
module.exports = learnedWordsModel