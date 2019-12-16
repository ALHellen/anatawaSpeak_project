const mongoose = require("mongoose")
const { learnedWordsSchema } = require('./learnedWordsSchema')
const { wordsToLearnSchema } = require('./wordsToLearnSchema')
const Schema = mongoose.Schema

const usersSchema = new schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true},
    name: { type: String, required: true},
    language: {type: String, required: true},
    email: { type: String, required: true},
    password: { tuype: String, required: true},
    learnedWords: [learnedWordsSchema],
    wordsToLearn: [wordsToLearnSchema]
})

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel