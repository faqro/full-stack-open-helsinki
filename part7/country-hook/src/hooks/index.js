import axios from "axios"
import { useEffect, useState } from "react"

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      if(name) {
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
          .then(response => {
            setCountry({...response.data, found: true})
          }).catch(error => {
            setCountry({found: false})
          })
      }
    }, [name])
  
    return country
}

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}