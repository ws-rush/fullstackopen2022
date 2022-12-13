const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')
const app = express()

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

let Persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${Persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(Persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = Persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).send('Not found')
    }
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    if (Persons.find(p => p.name === person.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const id = Math.floor(Math.random() * 1000000)
    const newPerson = {
        id: id,
        name: person.name,
        number: person.number
    }
    Persons = Persons.concat(newPerson)
    res.status(201).json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Persons = Persons.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 5000
app.listen(PORT, _ => {
    console.log(`Server running on port ${PORT}`)
})
