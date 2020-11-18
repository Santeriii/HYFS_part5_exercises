import React from 'react'

const FullBlog = ({ title, author, url, likes, id, likeMethod }) => {

  const like = () => {
      likeMethod(title, author, url, id)
  }

  return (
    <form onSubmit={like}>
      <div>{title} {author} {url} {likes}</div>
      <button type="submit">like</button>
    </form>
  )
  }

export default FullBlog
