const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Cris Jackson',
        username: 'cris',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can login', async ({ page }) => {
    await loginWith(page, 'cris', 'salainen')

    await expect(page.getByText('Hi, Cris Jackson! You are logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'cris', 'imwrong')

    await expect(page.getByText('wrong credentials')).toBeVisible()

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Hi, Cris Jackson! You are logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'cris', 'salainen')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'test note by playwright')

      await expect(page.getByText('test note by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'new test note by playwright')
      })

      test('importance can be changed', async ({ page }) => {
        const noteElement = page.getByText('new test note by playwright').locator('..')
        await noteElement.getByRole('button', { name: 'make not important'}).click()
        await expect(noteElement.getByText('make important')).toBeVisible()
      })
    })

    describe('several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first test note by playwright')
        await createNote(page, 'second test note by playwright')
        await createNote(page, 'third test note by playwright')
      })

      test('one of those can be made nonimportant', async ({ page }) => {
        const noteElement = page.getByText('second test note by playwright').locator('..')

        await noteElement.getByRole('button', { name: 'make not important'}).click()
        await expect(noteElement.getByText('make important')).toBeVisible()
      })
    })
  })
})
