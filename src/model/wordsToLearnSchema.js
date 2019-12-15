const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wordsToLearnSchema = new Schema({
    word: { type: String, required: true},
    language: { type: String},
    insertDate: { type: String}
})

const wordsToLearnModel = mongoose.model('wordsToLearn', wordsToLearnSchema)
module.exports = wordsToLearnModel