import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [user, setUser] = useState(null)
  const [ successfulBlogCreate, setSuccessfulBlogCreate ] = useState(false)
  const [ unsuccessfulBlogCreate, setUnsuccessfulBlogCreate ] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => (
    window.localStorage.removeItem('loggedBlogappUser')
  )

  const createNewBlog = ( title, author, url ) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    const success = blogService.create(newBlog)
    success ? setSuccessfulBlogCreate(true) : setUnsuccessfulBlogCreate(true)
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
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <CreateBlog createNewBlog={createNewBlog}></CreateBlog>
        {successfulBlogCreate && <h1>Blogin lisääminen onnistui!</h1>}
        {unsuccessfulBlogCreate && <h1>Blogin lisääminen epäonnistui!</h1>}
      </div>
    }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App