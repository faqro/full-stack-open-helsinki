import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = { ...(await blogService.create(blogObject)), user }

      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage({ status: 'success', message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added` })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage({ status: 'error', message: 'failed to add new blog' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (id) => {
    try {
      const { title, author, url, likes, user } = blogs.find(b => b.id === id)
      const returnedBlog = await blogService.update(id, {
        title, author, url, user: user.id,
        likes: likes+1
      })

      setBlogs(blogs.map((b) => b.id === id ? { ...returnedBlog, user } : b))
      setErrorMessage({ status: 'success', message: `liked blog ${title}` })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage({ status: 'error', message: 'failed to like blog' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)

      setBlogs(blogs.filter((b) => b.id !== id))
      setErrorMessage({ status: 'success', message: 'deleted blog' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      if(exception.response.status !== 401) setBlogs(blogs.filter((b) => b.id !== id))
      setErrorMessage({ status: 'error', message: `${exception.response.status === 401 ? 'cannot delete another users blog' : 'blog does not exist'}` })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setErrorMessage({ status: 'success', message: 'successfully logged in' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage({ status: 'error', message: 'wrong username or password' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    setUsername('')
    setPassword('')
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setErrorMessage({ status: 'success', message: 'successfully logged out' })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogInfo = () => (
    <div>
      <p>{user.name} logged in<button onClick={handleLogout} >logout</button></p>
      {blogForm()}
      {blogs.filter(b => !!b).sort((a, b) => a.id > b.id ? -1 : 1).sort((a, b) => a.likes < b.likes ? 1 : -1).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} username={user.username} />
      )}
    </div>
  )

  return (
    <div>
      {!user ?
        <div>
          <h2>log in to application</h2>
          <Notification notification={errorMessage} />
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification notification={errorMessage} />
          {blogInfo()}
        </div>
      }
    </div>
  )
}

export default App