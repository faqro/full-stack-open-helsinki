import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = (props) => {
  console.log('props value is', props)
  const {handleClick, text} = props
  return(
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left+1
    setLeft(updatedLeft)
    setTotal(updatedLeft+right)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left+updatedRight)
  }

  const resetCounters = () => {
    setLeft(0)
    setRight(0)
    setTotal(0)
  }

  const getReset = () => {
    return () => resetCounters()
  }

  const printMsg = who => () => console.log("Hello,", who)

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}

      <History allClicks={allClicks} />

      <p>total {total}</p>

      <Button handleClick={getReset()} text="reset counter"/>

      <Button handleClick={printMsg("bob")} text="Console MSG" />

      <Button handleClick={() => console.log("TEST")} text="Test MSG" />
      
    </div>
  )
}

export default App
