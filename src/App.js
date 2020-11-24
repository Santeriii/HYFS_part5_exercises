import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [user, setUser] = useState(null)
  const [ successfulBlogCreate, setSuccessfulBlogCreate ] = useState(false)
  const [ unsuccessfulBlogCreate, setUnsuccessfulBlogCreate ] = useState(false)

  const getBlogs = async () => {
    setBlogs(await blogService.getAll())
  }

  useEffect(() => {
    getBlogs()
    console.log(blogs)
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

  const createNewBlog = async ( title, author, url ) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    const success = blogService.create(newBlog)
    success ? setSuccessfulBlogCreate(true) : setUnsuccessfulBlogCreate(true)

    if (success) {
      setBlogs(blogs.concat(newBlog))
    }

    setTimeout(() => {
      setSuccessfulBlogCreate(false)
      setUnsuccessfulBlogCreate(false)
    }, 5000)
  }

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

    const like = ( blogId ) => {
      const copy = [...blogs]
      const blogIndex = copy.findIndex(blog => blog.id === blogId)
      copy[blogIndex].likes += 1
      setBlogs(copy)
  
      blogService.put(copy[blogIndex], blogId)
    }

    const removeBlog = (id) => {
      blogService.remove(id)
    }
    
  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {user === null ?
      <Togglable buttonLabel="Login"><LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/></Togglable> :
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="Create new blog"><CreateBlog createNewBlog={createNewBlog}></CreateBlog></Togglable>
      {successfulBlogCreate && <h1>Blogin lisääminen onnistui!</h1>}
      {unsuccessfulBlogCreate && <h1>Blogin lisääminen epäonnistui!</h1>}
      </div>
    }
    <Blog blogs={blogs} showButtonLabel='show more' cancelButtonLabel='show less' likeMethod={like} removeMethod={removeBlog} />
    </div>
  )
}

export default App