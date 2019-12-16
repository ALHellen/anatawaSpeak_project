const { connect } = require('../model/repository')
const usersModel = require('../model/userSchema')
const { learnedWordModel } = require('../model/learnedWordsSchema')
const { wordsToLearnModel } = require('../model/wordsToLearnSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAll = (request, response) => {
    usersModel.find((error, users) => {
      if (error) {
        return response.status(500).send(error)
      }
  
      return response.status(200).send(users)
    })
  }

  const getById = (request, response) => {
    const id = request.params.id
  
    return usersModel.findById(id, (error, user) => {
      if (error) {
        return response.status(500).send(error)
      }
  
      if (treinador) {
        return response.status(200).send(user)
      }
  
      return response.status(404).send('User not found.')
    })
  }

  const addUser = (request, response) => {
    const criptPassword = bcrypt.hashSync(request.body.senha)
    request.body.senha = criptPassword
    const newUser = new usersModel(request.body)
  
    newUser.save((error) => {
      if (error) {
        return response.status(500).send(error)
      }
  
      return response.status(201).send(newUser)
    })
  }

  const addWordToLearn = async (request, response) => {
    const userId = request.params.userId
    const word = request.body
    const options = { new: true }
    const newWord = new wordsToLearnModel(word)
    const user = await wordsToLearnModel.findById(userId)
  
    user.word.push(newWord)
    user.save((error) => {
      if (error) {
        return response.status(500).send(error)
      }
  
      return response.status(201).send(user)
    })
  }

  const addLearnedWord = async (request, response) => {
    const userId = request.params.userId
    const word = request.body
    const options = { new: true }
    const newWord = new learnedWordModel(word)
    const user = await learnedWordModel.findById(userId)
  
    user.word.push(newWord)
    user.save((error) => {
      if (error) {
        return response.status(500).send(error)
      }
  
      return response.status(201).send(user)
    })
  }

module.exports = {
    getAll,
    getById,
    addUser,
    addLearnedWord,
    addWordToLearn
}  






