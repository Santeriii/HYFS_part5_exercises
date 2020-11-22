import React, { useState } from 'react'

const Blog = ({ blogs, showButtonLabel, cancelButtonLabel, likeMethod, removeMethod }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (blog) => {
    likeMethod(blog.id)
  }

  const removeBlog = (blog) => {
    removeMethod(blog.id)
  }

  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => {
        return (
        <div style={hideWhenVisible}>
          <li>{blog.title}</li>
          <li>{blog.author}</li>
        </div>
        )
      })}
      <button onClick={toggleVisibility} style={hideWhenVisible}>{showButtonLabel}</button>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => {
        return (
          <div style={showWhenVisible}>
            <div>
              <p>Title: {blog.title}</p>
              <p>author: {blog.author}</p>
              <p>url: {blog.url}</p>
              <p>likes: {blog.likes}</p>
            </div>
            <button onClick={() => like(blog)}>like</button><button onClick={() => removeBlog(blog)}>remove</button>
          </div>
        )
      })}
      <button onClick={toggleVisibility} style={showWhenVisible}>{cancelButtonLabel}</button>
    </div>
  )
}

export default Blog
