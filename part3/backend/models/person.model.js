const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
    // unique: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        return value.split('-').length === 2 && value.split('-')[0].length >= 2 && value.split('-')[1].length >= 2
      },
      message: 'number must be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers'
    }
  }
})

// custome validator to check if number is separated by hyphens
// if formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers
// SOURCE: https://mongoosejs.com/docs/validation.html#custom-validators
// personSchema.path('number').validate(function (value) {
//   return value.split('-').length === 2 && value.split('-')[0].length >= 2 && value.split('-')[1].length >= 2
// }, 'number must be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers')

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
