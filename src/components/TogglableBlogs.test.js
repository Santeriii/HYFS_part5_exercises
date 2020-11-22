import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import TogglableElements from './Togglable'
import FullBlog from './FullBlog'
import Blog from './Blog'

describe('<TogglableBlogs />', () => {
  let component

    const blogs = [
      {
        title: "Ruokablogi",
        author: "Valtteri",
        likes: 5,
        id: "5fab13ea9f9cc604c0ecca6b",
        url: "ruokablogi.tk"
      }
    ]

    const like = () => {
      blogs[0].likes = blogs[0].likes + 1
    }

    const removeBlog = (id) => {
      blogs[0] = {}
    }


  beforeEach(() => {
    component = render(
      <Blog className='testDiv' blogs={blogs} showButtonLabel='show more' cancelButtonLabel='show less' likeMethod={like} removeMethod={removeBlog}/>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('likes are not displayed', () => {
    expect(
      component.getByText('likes: 5')
    ).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show more')
    fireEvent.click(button)

    const likes = component.getByText('likes: 5')
    expect(likes).toBeVisible()

    const url = component.getByText('url: ruokablogi.tk')
    expect(url).toBeVisible()
  })

  test('clicking the "like"-button calls event handler twice', async () => {
    const likeMethod = jest.fn()

    component = render(
      <Blog className='testDiv' blogs={blogs} showButtonLabel='show more' cancelButtonLabel='show less' likeMethod={likeMethod} removeMethod={removeBlog}/>
    )

    const showButton = component.getAllByText('show more')
    fireEvent.click(showButton[1])
  
    const button = component.getAllByText('like')
    fireEvent.click(button[1])
    fireEvent.click(button[1])
  
    expect(likeMethod.mock.calls).toHaveLength(2)
  })

})