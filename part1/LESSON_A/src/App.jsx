const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}


const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  const name = 'Faraaz'
  const age = 18

  const friends = [
    { name: 'Bob', age: 19+12 },
    { name: 'Emily', age: 17+10 },
  ]

  console.log(now, a+b)

  return (
    <>
      <p>Hello world, is it {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Hello name={friends[0].name} age={friends[0].age} />
      <Hello name={friends[1].name} age={friends[1].age} />
    </>
  )
}

export default App