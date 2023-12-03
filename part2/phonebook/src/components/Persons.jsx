import Person from './Person'

const Persons = (props) => {
    const {persons} = props
  
    return(
        <>
            {persons.map(person => <Person key={person.id} person={person} />)}
        </>
    )
}

export default Persons