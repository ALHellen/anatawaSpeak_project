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

```

### getById

Traz um único usuário. 

* Rota

```
router.get('/:id', authent, controller.getById)
```

* Controller

```

```

### addUser

Adiciona um novo usuário. 

* Rota

```
router.post('',  controller.addUser)
```

* Controller

```

```

### login

Loga o usuário e gera um token para autorização. 

* Rota

```
router.post('/login', controller.login)
```

* Controller

```

```

### addWordToLearn

Adiciona uma palavra que o usuário deseja estudar depois.

* Rota

```
router.post('/:userId/wordsToLearn', authent, controller.addWordToLearn)
```

* Controller

```

```

### addLearnedWord

Adiciona uma palavra que o usuário já aprendeu.

* Rota

```
router.post('/:userId/learnedWords', authent, controller.addLearnedWord)
```

* Controller

```

```

### updateUser

Modifica dados já cadastrados pelo usuário.

* Rota

```
router.patch('/:id/update', authent, controller.updateUser
```

* Controller

```

```

### removeUser

Deleta a conta do usuário. 

* Rota

```
router.delete('/:id/deleteUser', authent, controller.removeUser)
```

* Controller

```

```