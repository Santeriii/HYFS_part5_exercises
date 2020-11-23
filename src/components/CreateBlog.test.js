import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import CreateBlog from './CreateBlog'

test('<CreateBlog />', () => {
    const createBlogMethodBody = jest.fn()

    const component = render(
        <CreateBlog createNewBlog={createBlogMethodBody} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'test title'}
    })
    fireEvent.change(author, {
        target: { value: 'test author'}
    })
    fireEvent.change(url, {
        target: { value: 'test url'}
    })
    fireEvent.submit(form)

    expect(createBlogMethodBody.mock.calls).toHaveLength(1)
    expect(createBlogMethodBody.mock.calls[0][0]).toBe('test title')
    expect(createBlogMethodBody.mock.calls[0][1]).toBe('test author')
    expect(createBlogMethodBody.mock.calls[0][2]).toBe('test url')
})