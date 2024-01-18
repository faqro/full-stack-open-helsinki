import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, username }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  const updateLikesBlog = () => {
    likeBlog(blog.id)
  }

  return(
    <div style={blogStyle} className='blog' >
      {blog.title} {blog.author}<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className="showWhenToggle">
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={updateLikesBlog}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={{ display: blog.user.username === username ? '' : 'none' }}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog