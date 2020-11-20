import React from 'react'
const Blog = ({ blog }) => (
  <div className='blog'>
    <li>{blog.title}</li>
    <li>{blog.author}</li>
  </div>
)

export default Blog
