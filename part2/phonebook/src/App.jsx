import {useState, useEffect} from 'react'
import axios from 'axios'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.find(person => person.name === newName)

    if(personExists) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...personExists, number: newNumber}

        console.log(`update person`)
        personService
          .update(personExists.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      console.log(`add person`)

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    
  }

  const deletePerson = (person) => {
    const {id, name} = person

    if(window.confirm(`Delete ${name}?`)) {
      console.log(`delete person ${id}`)
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const updateFilter = (event) => {
    setSearchFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = searchFilter
    ? persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilter={updateFilter} />
      <h2>add a new</h2>
      <PersonForm
        onAdd={addPerson}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteAction={deletePerson} />
    </div>
  )
}

export default App