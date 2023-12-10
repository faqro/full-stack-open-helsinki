import Weather from './Weather'

const CountryDetails = (props) => {
  const {country} = props

  return(
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={'flag of '+country.name.common} />
      <Weather city={country.capital} />
    </>
  )
}

export default CountryDetails