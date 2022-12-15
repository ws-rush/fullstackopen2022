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
    const length = Person.find({}).then(result => {
        res.send(`<p>Phonebook has info for ${result.length} people</p><p>${date}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const {id} = req.params
    Person.findById(id)
    .then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const {name, number} = req.body
    if (!name || !number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    Person.create({name, number})
    .then(savedPerson => res.status(201).json(savedPerson))
    .catch(error => res.status(404).send({ error: 'malformatted id' }))
})

app.put('/api/persons/:id', (req, res, next) => {
    console.log('put')
  const {id} = req.params
  const {name, number} = req.body

  Person.findByIdAndUpdate(id, {name, number}, { new: true })
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

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(errorHandler)
app.use(unknownEndpoint)

// connect to db
require('dotenv').config()
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