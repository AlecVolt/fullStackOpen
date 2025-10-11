import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

describe('<Note />', () => {
  test('renders content', () => {
    const note = {
      content: 'This is a test note',
      important: true
    }

    render(<Note note={note} />)

    const element = screen.getByText('This is a test note')

    expect(element).toBeDefined()
  })

  test('clicking the button calls event handler once', async () => {
    const note = {
      content: 'This is a test note',
      important: true
    }

    const mockHandler = vi.fn()

    render(<Note note={note} toggleImportance={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})