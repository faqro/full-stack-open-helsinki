const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response) => {
  blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async(request, response, next) => {
  const body = request.body
  if(!request.user) { return response.status(401).json({ error: 'token invalid' }) }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user.id
  })

  savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
  
  if(!request.user) { return response.status(401).json({ error: 'token invalid' }) }
  const blog = await Blog.findById(request.params.id)
  if(!blog) return response.sendStatus(404)
  
  if(blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({ error: 'cannot delete another users blog' })
  }

  request.user.blogs = request.user.blogs.filter(ublog => ublog._id.toString() !== blog._id.toString())
  
  await Blog.findByIdAndDelete(request.params.id)
  await request.user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {...body}, {new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter