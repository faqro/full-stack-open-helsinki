import { useState } from 'react'

const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}



const App = (props) => {
  const name = 'Peter'
  const age = 10

  const [ counter, setCounter ] = useState(0)
  const [ counterb, setCounterB ] = useState(0)

  const increaseByOne = () => setCounterB(counterb + 1)
  const setToZero = () => setCounterB(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      
      {counter}
      <br></br>
      {counterb}
      <br></br>

      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}> 
        zero
      </button>
    </div>
  )
}

export default App