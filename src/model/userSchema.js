const mongoose = require("mongoose")
const { learnedWordsSchema } = require('./learnedWordsSchema')
const { wordsToLearnSchema } = require('./wordsToLearnSchema')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true},
    name: { type: String, required: true},
    language: {type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    group: {type: String},
    learnedWords: [learnedWordsSchema],
    wordsToLearn: [wordsToLearnSchema]
})

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel