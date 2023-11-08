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

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onSmash, text}) => <button onClick={onSmash}>{text}</button>

const App = (props) => {
  const name = 'Peter'
  const age = 10

  const [ counter, setCounter ] = useState(0)
  const [ counterb, setCounterB ] = useState(0)
  console.log('rendering with counter value', counterb)

  const increaseByOne = () => {
    console.log('increasing, value before', counterb)
    setCounterB(counterb + 1)
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counterb)
    setCounterB(counterb - 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counterb)
    setCounterB(0)
  }

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      
      <Display counter={counter}/>
      <br></br>


      <Display counter={counterb}/>
      <Button onSmash={increaseByOne} text='plus' />
      <Button onSmash={decreaseByOne} text='minus' />
      <Button onSmash={setToZero} text='zero' />

    </div>
  )
}

export default App