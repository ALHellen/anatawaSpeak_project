# あなたはSpeak

O あなたはSpeak é uma API para ajudar na memorização de palavras de diferentes idiomas.

## Utilização

### getAll

Traz todos os usuários cadastrados. 

* Rota

```
router.get('',  controller.getAll)
```

* Controller

```
const getAll = (request, response) => {
    usersModel.find((error, users) => {
      if (error) {
        return response.status(500).send(error)
      }
  
      return response.status(200).send(users)
    })
  }
```

### getById

Traz um único usuário. 

* Rota

```
router.get('/:id', authent, controller.getById)
```

* Controller

```
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
```

### addUser

Adiciona um novo usuário. 

* Rota

```
router.post('',  controller.addUser)
```

* Controller

```
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

```

### login

Loga o usuário e gera um token para autorização. 

* Rota

```
router.post('/login', controller.login)
```

* Controller

```
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
```

### addWordToLearn

Adiciona uma palavra que o usuário deseja estudar depois.

* Rota

```
router.post('/:userId/wordsToLearn', authent, controller.addWordToLearn)
```

* Controller

```
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
```

### addLearnedWord

Adiciona uma palavra que o usuário já aprendeu.

* Rota

```
router.post('/:userId/learnedWords', authent, controller.addLearnedWord)
```

* Controller

```
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
```

### updateUser

Modifica dados já cadastrados pelo usuário.

* Rota

```
router.patch('/:id/update', authent, controller.updateUser
```

* Controller

```
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
```

### removeUser

Deleta a conta do usuário. 

* Rota

```
router.delete('/:id/deleteUser', authent, controller.removeUser)
```

* Controller

```
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
```