require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => {
            response.json(note)
        })
        .catch(error => {
            response.status(404).end()
        })
})

app.delete('/api/notes/:id', (request, response) => { //needs mongodb refactor
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

//put request implementation needed

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port @ ${PORT}`)
})