import React, { useState } from 'react'

const CreateBlog = ({ createNewBlog }) => {
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')

    const handleSubmit = ( event ) => {
        event.preventDefault()
        createNewBlog(title, author, url)
    }

    return (
    <form onSubmit={handleSubmit}>
        <h1>Title:</h1><input id='title' value={title} onChange={({ target }) => setTitle(target.value)}/>
        <h1>Author:</h1><input id='author' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        <h1>Url:</h1><input id='url' value={url} onChange={({ target }) => setUrl(target.value)}/>
        <button type="submit">submit</button>
    </form>
    )
}

export default CreateBlog