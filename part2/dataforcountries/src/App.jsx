import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data.map(country => country.name.common))
      })
  }, [])

  const updateFilter = (event) => {
    setSearchFilter(event.target.value)
  }

  const handleShowAction = (name) => {
    setSearchFilter(name)
  }

  const countriesToShow = searchFilter
    ? countries.filter(country => country.name.common.toLowerCase().includes(searchFilter.toLowerCase()))
    : countries

  return (
    <div>
      <Filter onFilter={updateFilter} />
      <Countries countries={countriesToShow} showAction={handleShowAction} />
    </div>
  )
}

export default App
