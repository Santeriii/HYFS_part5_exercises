import React from 'react'

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

export default FullBlog
