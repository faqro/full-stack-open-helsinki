import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes, filter}) => filter ? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())) : anecdotes)

    const vote = ({id, content}) => {
        dispatch(voteAnecdote(id))
        dispatch(showNotification(`you voted '${content}'`, 5))
    }
    
    return(
        <>
            {[...anecdotes]
                .sort((a, b) => a.votes>b.votes ? -1 : 1)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AnecdoteList