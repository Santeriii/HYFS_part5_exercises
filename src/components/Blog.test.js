import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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