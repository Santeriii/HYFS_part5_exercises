import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testi',
    author: 'Jukka'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const li = component.container.querySelector('li')
  const li2 = component.container.querySelector(
    'li:nth-child(2)'
  )
  expect(li).toHaveTextContent(
    'Testi'
  )
  expect(li2).toHaveTextContent(
    'Jukka'
  )
})

test('clicking the button opens full blog', async () => {
    const blog = {
        title: 'Testi2',
        author: 'Pekka',
        url: 'phonearena.com',
        likes: 3
    }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <FullBlog title={title} author={mockHandler} />
    )
  
    const button = component.getByText('make not important')
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })