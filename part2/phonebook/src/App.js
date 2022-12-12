import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {

  // states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  // effects
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log(error)
        setMessage({
          text: `Error: ${error}`,
          type: 'error'
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }, [])


  // controlled components
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // pure variables
  const personsToShow = filter.length === 0 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  // pure functions
  const addPerson = (event) => {
    event.preventDefault()

    // check if the name already exists
    if (persons.find(person => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`)
      return
    } else if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setMessage({
              text: `Updated ${returnedPerson.name}`,
              type: 'success'
            })
          })
          .catch(error => {
            console.log(error)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
            setMessage({
              text: `Error: ${error}`,
              type: 'error'
            })
          })

        setTimeout(() => {
          setMessage(null)
        }, 5000)

        // reset the form
        setNewName('')
        setNewNumber('')
      }
      return
    }

    personService
      .create({
        name: newName,
        number: newNumber
      })
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage({
          text: `Added ${returnedPerson.name}`,
          type: 'success'
        })
      })
      .catch(error => {
        console.message(error)
        setMessage({
          text: `Error: ${error}`,
          type: 'error'
        })

      setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    
    // reset the form
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage({
            text: `Deleted ${person.name}`,
            type: 'success'
          })
        })
        .catch(error => {
          console.log(error)
          setMessage({
            text: `Error: ${error}`,
            type: 'error'
          })
        })

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message.text} type={message.type} />}
      <Filter text={filter} handleChange={handleFilterChange} />
      
      <h2>Add a new</h2>
      <PersonsForm handleSubmit={addPerson} name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App