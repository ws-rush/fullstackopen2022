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
        notify(`Error: ${error}`, 'error')
      })
  }, [])


  // controlled components
  const handleNameChange = ({target}) => {
    setNewName(target.value)
  }

  const handleNumberChange = ({target}) => {
    setNewNumber(target.value)
  }

  // pure variables
  const personsToShow = filter.length === 0 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  // pure functions
  const notify = (message, type = 'success') => {
    setMessage({ text: message, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

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
            notify(`Updated ${returnedPerson.name}`)
          })
          .catch(error => {
            console.log(error)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
            notify(`Error: ${error}`, 'error')
          })

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
        notify(`Added ${returnedPerson.name}`)
      })
      .catch(error => {
        console.message(error)
        notify(`Error: ${error}`, 'error')
      })
    
    // reset the form
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          notify(`Deleted ${person.name}`)
        })
        .catch(error => {
          console.log(error)
          notify(`Error: ${error}`, 'error')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message.text} type={message.type} />}
      <Filter 
        value={filter}
        handleChange={({target}) => setFilter(target.value)}
      />
      
      <h2>Add a new</h2>
      <PersonsForm handleSubmit={addPerson} name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App