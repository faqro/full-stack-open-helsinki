import { useState } from 'react'

const Button = (props) => {
  console.log('props value is', props)
  const {handleClick, text} = props
  return(
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const StatisticLine = (props) => {
  console.log('props value is', props)
  const {text, value} = props
  return(
  <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Header = (props) => {
  console.log('props value is', props)
  const {title} = props
  return(
  <h1>{title}</h1>
  )
}

const Statistics = (props) => {
  console.log('props value is', props)
  const {good, neutral, bad} = props

  const total = good+neutral+bad

  if(total===0) {
    return(
      <>
        <Header title="statistics" />
        <p>No feedback given</p>
      </>
    )
  }

  const avg = () => (((-1*bad) + (1*good))/total)
  const positive = () => ((good/total)*100)

  return(
    <>
      <Header title="statistics" />
      
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={avg()} />
          <StatisticLine text="positive" value={positive()+" %"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBad = () => {
    setBad(bad+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
  }
  const handleGood = () => {
    setGood(good+1)
  }

  return (
    <div>
      <Header title="give feedback" />
      <Button handleClick={handleBad} text="bad" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleGood} text="good" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App