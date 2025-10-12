const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blogs App', () => {
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
    await expect(page.getByText("Hi! I'm a blog list app!")).toBeVisible()
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'cris', 'salainen')
      await expect(page.getByText('Welcome back, Cris Jackson')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'cris', 'wroong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'cris', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog'}).click()

      await page.getByLabel('title:').fill('new title by playwright')
      await page.getByLabel('author:').fill('new author by playwright')
      await page.getByLabel('url:').fill('new url by playwright')

      await page.getByRole('button', { name: 'add new blog' }).click()

      await expect(page.getByText('"new title by playwright" by new author by playwright')).toBeVisible()
    })
  })
})