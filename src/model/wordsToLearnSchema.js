const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wordsToLearnSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true},
    word: { type: String, required: true},
    language: { type: String},
    insertDate: { type: String}
})

const wordsToLearnModel = mongoose.model('wordsToLearn', wordsToLearnSchema)
module.exports = {wordsToLearnModel, wordsToLearnSchema}