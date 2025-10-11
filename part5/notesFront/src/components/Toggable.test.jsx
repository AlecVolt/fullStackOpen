import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggable from './Toggable'

describe('<Toggable />', () => {
  beforeEach(() => {
    render(
      <Toggable buttonLabel='show...' >
        <div>toggable content</div>
      </Toggable>
    )
  })

  test('renders its children', () => {
    screen.getByText('toggable content')
  })

  test('at start the children are not displayed', () => {
    const element = screen.getByText('toggable content')
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('toggable content')
    expect(element).toBeVisible()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const element = screen.getByText('toggable content')
    expect(element).not.toBeVisible()
  })
})