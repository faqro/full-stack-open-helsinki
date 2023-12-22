const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async(request, response, next) => {
  const blog = new Blog({likes: 0, ...request.body})

  savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {...body}, {new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter