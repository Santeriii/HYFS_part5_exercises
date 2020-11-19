import React from 'react'
import PropTypes from 'prop-types'

const FullBlog = ({ title, author, url, likes, id, likeMethod, removeBlogMethod }) => {

  const like = () => {
      likeMethod(title, author, url, id, likes)
  }

  const removeBlog = () => {
    removeBlogMethod(id)
  }

  return (
    <form onSubmit={like}>
      <div>{title} {author} {url} {likes}</div>
      <button type="submit">like</button><button onClick={removeBlog}>remove</button>
    </form>
  )
}

FullBlog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  likeMethod: PropTypes.func.isRequired,
  removeBlogMethod: PropTypes.func.isRequired
}

export default FullBlog
