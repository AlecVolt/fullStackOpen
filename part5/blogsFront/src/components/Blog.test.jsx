import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders the blogs title and author', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 'test likes',
      user: {
        name: 'test user name',
        username: 'test user username'
      }
    }

    render(<Blog blog={blog} />)

    const titleElement = screen.getByText('test title')
    expect(titleElement).toBeVisible()

    const authorElement = screen.getByText('test author')
    expect(authorElement).toBeVisible()

    const viewButtonElement = screen.getByText('view')
    expect(viewButtonElement).toBeVisible()

    const urlElement = screen.queryByText('test url')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('test likes')
    expect(likesElement).toBeNull()

    const userElement = screen.queryByText('test user name')
    expect(userElement).toBeNull()
  })

  // test('renders the blogs title and author', () => {
  //   const blog = {
  //     title: 'test title',
  //     author: 'test author',
  //     url: 'test url',
  //     likes: 'test likes',
  //     // user: {
  //     //   name: 'test user name',
  //     //   username: 'test user username'
  //     // }
  //   }

  //   const { container } = render(<Blog blog={blog} />)

  //   const element = screen.getByText('test title')
  //   expect(element).toBeDefined()
  // })
})