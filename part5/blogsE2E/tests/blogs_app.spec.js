const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

    await request.post('/api/users', {
      data: {
        name: 'Edward Ken',
        username: 'edward',
        password: 'pawwword'
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
      await createBlog(page, 'new title by playwright', 'new author by playwright', 'new url by playwright')

      await expect(page.getByText('"new title by playwright" by new author by playwright')).toBeVisible()
    })

    describe('When a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'new title by playwright', 'new author by playwright', 'new url by playwright')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like me' }).click()

        const likes = page.locator('.likesNum')
        await expect(likes).toContainText('1')

        await page.getByRole('button', { name: 'like me' }).click()
        await expect(likes).toContainText('2')
      })

      test('user who added the blog sees the blogs delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        
        await expect(page.getByRole('button', { name: 'delete blog' })).toBeVisible()
      })

      test('only user who added the blog sees the blogs delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        
        await expect(page.getByRole('button', { name: 'delete blog' })).toBeVisible()
        
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'edward', 'pawwword')
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByRole('button', { name: 'delete blog' })).not.toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'delete blog' })).toBeVisible()

        page.on('dialog', async dialog => await dialog.accept())
        await page.getByRole('button', { name: 'delete blog' }).click()
        
        await expect(page.getByRole('button', { name: 'delete blog' })).not.toBeVisible()
        await expect(page.getByText('"new title by playwright" by new author by playwright')).not.toBeVisible()
      })

      test('a blog will not be deleted after dismissial of dialog', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'delete blog' })).toBeVisible()
        
        page.on('dialog', async dialog => await dialog.dismiss())
        await page.getByRole('button', { name: 'delete blog' }).click()

        await expect(page.getByRole('button', { name: 'delete blog' })).toBeVisible()
        await expect(page.getByText('"new title by playwright" by new author by playwright')).toBeVisible()
      })
    })


  })
})