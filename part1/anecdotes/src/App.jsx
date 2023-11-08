import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const Heading = ({title}) => (
  <h1>{title}</h1>
)

const AnecdoteDisplay = ({anecdote, voteCount}) => (
  <>
    <p>{anecdote}</p>
    <p>has {voteCount} votes</p>
  </>
)

const MostVoted = ({anecdotes, votes}) => {
  const highestVoteCount = Math.max( ... votes )
  const highestVoteIndex = votes.indexOf(highestVoteCount)

  if(highestVoteCount===0) {
    return(
      <p>No votes have been placed</p>
    )
  }

  return(
    <AnecdoteDisplay anecdote={anecdotes[highestVoteIndex]} voteCount={highestVoteCount} />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const setRandAnecdote = () => {
    const newAnecdote = Math.floor(Math.random() * anecdotes.length)
    setSelected(newAnecdote)
  }

  const voteForAnecdote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  return (
    <div>
      <Heading title="Anecdote of the day" />
      <AnecdoteDisplay anecdote={anecdotes[selected]} voteCount={votes[selected]} />

      <Button text="vote" handleClick={voteForAnecdote} />
      <Button text="next anecdote" handleClick={setRandAnecdote} />

      <Heading title="Anecdote with most votes" />
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App