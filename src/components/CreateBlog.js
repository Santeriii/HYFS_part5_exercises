import React, { useState } from 'react'

const CreateBlog = ({ createNewBlog }) => {
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')

    const handleSubmit = () => {
        createNewBlog(title, author, url)
    }

    return (
    <form onSubmit={handleSubmit}>
        <h1>Title:</h1><input value={title} onChange={({ target }) => setTitle(target.value)}/>
        <h1>Author:</h1><input value={author} onChange={({ target }) => setAuthor(target.value)}/>
        <h1>Url:</h1><input value={url} onChange={({ target }) => setUrl(target.value)}/>
        <button type="submit">submit</button>
    </form>
    )
}

export default CreateBlog