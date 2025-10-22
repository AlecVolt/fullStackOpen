import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<CreateBlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const submitButton = screen.getByText('add new blog')

    await user.type(titleInput, 'new title input')
    await user.type(authorInput, 'new author input')
    await user.type(urlInput, 'new url input')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('new title input')
    expect(createBlog.mock.calls[0][0].author).toBe('new author input')
    expect(createBlog.mock.calls[0][0].url).toBe('new url input')
  })
})