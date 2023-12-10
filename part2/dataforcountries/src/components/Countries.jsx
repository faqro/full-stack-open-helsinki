import CountryItem from "./CountryItem"
import CountryDetails from "./CountryDetails"

const Countries = (props) => {
    const {countries, showAction} = props
  
    if(countries.length > 10) {
      return(
        <p>Too many matches, specify another filter</p>
      )
    }
  
    if(countries.length === 0) {
      return (
        <p>No results found</p>
      )
    }
  
    if(countries.length === 1) {
      return(
        <CountryDetails country={countries[0]} />
      )
    }
    
    return(
      <>
        {countries.map(country => <CountryItem key={country.name.common} name={country.name.common} showAction={() => showAction(country.name.common)} />)}
      </>
    )
}

export default Countries