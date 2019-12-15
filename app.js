const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const users = require('./routes/usersSchema')
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/users', users)

app.get('/', (request, response) => {
  response.send('Hello world!')
})

app.listen(PORT)
console.info(`Rodando na porta ${PORT}`)