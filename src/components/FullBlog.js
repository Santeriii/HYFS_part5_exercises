import React from 'react'
import PropTypes from 'prop-types'

const FullBlog = ({ blog, likeMethod, removeBlogMethod }) => {

  const like = () => {
      likeMethod(blog.title, blog.author, blog.url, blog.id, blog.likes)
  }

  const removeBlog = () => {
    removeBlogMethod(blog.id)
  }

  return (
    <form onSubmit={like}>
      <div>
        <p>Title: {blog.title}</p>
        <p>author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>likes</p>
        </div>
      <button type="submit">like</button><button onClick={removeBlog}>remove</button>
    </form>
  )
}

FullBlog.propTypes = {
  blog: PropTypes.isRequired,
  likeMethod: PropTypes.func.isRequired,
  removeBlogMethod: PropTypes.func.isRequired
}

export default FullBlog
