const express = require('express')
const mongoose = require('mongoose')
// const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.model')

const app = express()

// middlewares
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
// app.use(morgan('tiny'))
// log POST requests
// morgan.token('body', (req, res) => {
//     if (req.method === 'POST') {
//         return JSON.stringify(req.body)
//     } else {
//         return ''
//     }
// })
// app.use(morgan(':method :url :status - :body'))

app.get('/info', (req, res) => {
  const date = new Date()
  Person.find({}).then(result => {
    res.send(`<p>Phonebook has info for ${result.length} people</p><p>${date}</p>`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const {
    id
  } = req.params
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const {
    name,
    number
  } = req.body
  if (!name || !number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  // check if name already exists
  Person.find({
    name
  }).then(result => {
    if (result.length > 0) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
  })

  Person.create({
    name,
    number
  })
    .then(savedPerson => res.status(201).json(savedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  console.log('put')
  const {
    id
  } = req.params
  const {
    name,
    number
  } = req.body

  // { new: true } returns the updated document,
  // { runValidators: true } runs the validators on this command,
  // { context: 'query' } allows us to use findByIdAndUpdate
  Person.findByIdAndUpdate(id, {
    name,
    number
  }, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'unknown endpoint'
  })
}

app.use(errorHandler)
app.use(unknownEndpoint)

// connect to db
// require('dotenv').config()
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests with env variables
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log('listining on port: ', process.env.PORT)
    })
  })
  .catch(error => {
    console.warn(error)
  })
