import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 5,
      user: {
        name: 'test user name',
        username: 'test user username'
      }
    }

    render(<Blog blog={blog} />)
  })

  test('renders the blogs title and author', () => {
    const titleElement = screen.getByText('test title')
    expect(titleElement).toBeVisible()

    const authorElement = screen.getByText('test author')
    expect(authorElement).toBeVisible()

    const viewButtonElement = screen.getByText('view')
    expect(viewButtonElement).toBeVisible()

    const urlElement = screen.queryByText('test url')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('5')
    expect(likesElement).toBeNull()

    const userElement = screen.queryByText('test user name')
    expect(userElement).toBeNull()
  })

  test('after clicking the button, other info are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const titleElement = screen.getByText('test title')
    expect(titleElement).toBeVisible()

    const authorElement = screen.getByText('test author')
    expect(authorElement).toBeVisible()

    const viewButtonElement = screen.getByText('hide')
    expect(viewButtonElement).toBeVisible()

    const urlElement = screen.getByText('test url')
    expect(urlElement).toBeVisible()

    const likesElement = screen.getByText('5', { exact: false })
    expect(likesElement).toBeVisible()

    const userElement = screen.getByText('test user name')
    expect(userElement).toBeVisible()
  })
})