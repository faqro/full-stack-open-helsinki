const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async() => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        blogObject.user = user._id
        await blogObject.save()
    }
})

const getToken = async () => {
    const response = await api.post('/api/login').send({ username: 'root', password: 'secret' })
    return response.body.token
}

test('all blogs are returned, in json format', async() => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier is returned as \"id\"', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('successfully creates new blog posts', async() => {
    const token = await getToken()
    
    const newBlog = {
        title: 'test blog',
        author: 'John',
        url: 'https://example.com',
        likes: 24,
    }

    await api
        .post('/api/blogs')
        .auth(token, {type: 'bearer'})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('test blog')
})

test('fails to create new blog without token', async() => {
    
    const newBlog = {
        title: 'test blog',
        author: 'John',
        url: 'https://example.com',
        likes: 24,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('new blog posts without specified likes defaults to 0', async() => {
    const token = await getToken()

    const newBlog = {
        title: 'test blog 2',
        author: 'Bob',
        url: 'https://example2.com',
    }

    const blogCreated = await api.post('/api/blogs').auth(token, {type: 'bearer'}).send(newBlog).expect(201)

    expect(blogCreated.body.likes).toEqual(0)
})

test('new blog posts without specified title fails', async() => {
    const token = await getToken()

    const newBlog = {
        author: 'Matt',
        url: 'https://example3.com',
        likes: 5,
    }

    await api.post('/api/blogs').auth(token, {type: 'bearer'}).send(newBlog).expect(400)
})

test('new blog posts without specified url fails', async() => {
    const token = await getToken()

    const newBlog = {
        title: 'test blog 4',
        author: 'Adam',
        likes: 7,
    }

    await api.post('/api/blogs').auth(token, {type: 'bearer'}).send(newBlog).expect(400)
})

test('delete blog for valid ids', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const token = await getToken()

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .auth(token, {type: 'bearer'})
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('update likes on a blog with a valid id', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes + 1,
        })
        .expect(200)

    expect(updatedBlog.body.likes).toEqual(blogToUpdate.likes + 1)
})

afterAll(async() => {
    await mongoose.connection.close()
})