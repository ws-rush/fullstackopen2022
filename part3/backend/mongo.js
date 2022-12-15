const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password, name and number as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://rush:${password}@cluster0.bk2wozq.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('Phonebook:')
      return Person.find({})
    })
    .then((result) => {
      result.forEach((person) => {
        console.log(person.name, person.number)
      })
      // console.log(result)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
} else if (process.argv.length === 5) {
    mongoose
    .connect(url)
    .then((result) => {
        const person = new Person({
          name: process.argv[3],
          number: process.argv[4],
        })

        return person.save()
    })
    .then(() => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}