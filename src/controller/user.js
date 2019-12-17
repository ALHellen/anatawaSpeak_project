const { connect } = require('../model/repository')
const usersModel = require('../model/userSchema')
const { learnedWordsModel } = require('../model/learnedWordsSchema')
const { wordsToLearnModel } = require('../model/wordsToLearnSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const KEY = "MIICXAIBAAKBgQCOl54HaBM/WiL/jPPdFGjm9f8VprUst1J+vs7G/YRGRHYLGqt+M/ljAhcROPy3FdaVi2smqqyZhf4d+EZ9lKM6LVed91sxvcyMFEp6x8R2KS9wIzUtJ6r1MAIKd8HURmbaN4V2TV/FLeOUANRCZ+QhYEy+eNbuVIJANYtXBUSn8QIDAQABAoGBAIuVS/MAJGdNuxjiSA5Q3mfIw03UhWIiirTb39rXbNbESbGRB/NguW38K8yGNoya6hY2BkwxowgeLKX11js0d5sSHgEgL+pDQtXshHu7vlYU0ksHwfmD/R8+ZHJH6F6L0vuzs4NoVK/8iQHFLboUjF2sORyuLHbBmFZQWhInet8pAkEA0OlL2uHCYhkNuokJ9H+OnJEqKS2BtYSkH3Hrh2opZg2HtvUtXEIxzmj/95CzxMXQtNJhQMK3ekvnF3Upcj2avwJBAK67i8OEKM2jerbFKrBqr6/kUkZeyHLA8I4L2C3/3nKPGUj/GAc2xxuK1XxnpC0e3Wqz5OMwzkWU4Ynblsdq2U8CQHu9U6LICbzVHh6YwP7C9xOhoBlXzPZZJGVDssA4j2DVLsednUqCIsIhy0s1uGUazi3sVpJnQwn7H1vzl6ME/j0CQAT7qj+4LCW5LM27j70aPcppW4NQPq0vHW0fn1moe2KO/CydwcSq5kC909rJZeA3ih755GQqRyeq2EfDMGidfncCQD770Za6sJP1/i1vcdoWuWYnhpiU8TNKjFb2vJEN598amcyJV9PlAAdEkszh6EDA76t6/yT6NoUn/y9x4YskzQo="

connect()

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
  
      if (user) {
        return response.status(200).send(user)
      }
  
      return response.status(404).send('User not found.')
    })
  }

  const addUser = (request, response) => {
    if(!request.body.password){
      return response.status(400).send("Please write a password")
    }
    const criptPassword = bcrypt.hashSync(request.body.password)
    request.body.password = criptPassword
    request.body.group = "in"
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
    const user = await usersModel.findById(userId)
  
    user.wordsToLearn.push(newWord)
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
    const newWord = new learnedWordsModel(word)
    const user = await usersModel.findById(userId)
  
    user.learnedWords.push(newWord)
    user.save((error) => {
      if (error) {
        return response.status(500).send(error)
      }
  
      return response.status(201).send(user)
    })
  }

  const login = async (request, response) => {
    const email = request.body.email
    const userFound = await usersModel.findOne({ email: email })

    if(userFound){
    const validPassword = bcrypt.compareSync(request.body.password, userFound.password)
    
    if(validPassword){
      const token = jwt.sign({
        group: userFound.group
      },
        KEY,{expiresIn: 6000}
      )
      return response.status(200).send({token})
  }
  return response.status(401).send("Invalid email or password")
  }
}

const updateUser = (request, response) => {
    const id = request.params.id
    const userUpdate = request.body
    const options = { new: true}

    usersModel.findByIdAndUpdate(
      id,
      userUpdate,
      options,
      (error, user) => {
        if(error){
        return response.status(500).send(error)
        }

      if(user){
        return response.status(200).send(user)
      }

      return response.status(401).send("User not found" + error)
    })
} 



const removeUser = (request, response) => {
  const id = request.params.id

  usersModel.findByIdAndDelete(id,(error, user) => {

    if(error){
      return response.status(500).send(error)
    }

    if(user){
      return response.status(200).send(id)
    }

    return response.status(404).send("User not found")

  }) 
}


module.exports = {
    getAll,
    getById,
    addUser,
    addLearnedWord,
    addWordToLearn,
    login,
    updateUser,
    removeUser
}  






