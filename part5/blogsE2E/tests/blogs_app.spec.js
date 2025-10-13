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

  describe('When more blogs exists', () => {
    beforeEach(async ({ page, request }) => {
      const loginResponse = await request.post('/api/login', {
        data: {
          username: 'cris',
          password: 'salainen'
        }
      })

      const { token } = await loginResponse.json()

      await request.post('/api/blogs', {
        data: {
          title: 'title 1',
          author: 'author 1',
          url: 'ulr 1',
          likes: 10
        },
        headers: { Authorization: `Bearer ${token}` }
      })

      await request.post('/api/blogs', {
        data: {
          title: 'title 2',
          author: 'author 2',
          url: 'ulr 2',
          likes: 12
        },
        headers: { Authorization: `Bearer ${token}` }
      })

      await request.post('/api/blogs', {
        data: {
          title: 'title 3',
          author: 'author 3',
          url: 'ulr 3',
          likes: 1
        },
        headers: { Authorization: `Bearer ${token}` }
      })

      await request.post('/api/blogs', {
        data: {
          title: 'title 4',
          author: 'author 4',
          url: 'ulr 4',
          likes: 28
        },
        headers: { Authorization: `Bearer ${token}` }
      })

      await page.goto('/')
      await loginWith(page, 'cris', 'salainen')
    })

    test('blogs are existing', async ({ page }) => {
      await expect(page.getByText('"title 1" by author 1')).toBeVisible()
      await expect(page.getByText('"title 2" by author 2')).toBeVisible()
      await expect(page.getByText('"title 3" by author 3')).toBeVisible()
      await expect(page.getByText('"title 4" by author 4')).toBeVisible()
    })

    test('blogs are arranged in the order according to the likes (highest first)', async ({ page }) => {
      const blogItems = await page.locator('.blogItem').all()
      
      for (const blog of blogItems) {
        await blog.getByRole('button', { name: 'view' }).click()
      }

      const likes = []
      for (const blog of blogItems) {
        const likesAmount = await blog.locator('.likesNum').innerText()
        likes.push(Number(likesAmount))
      }

      const sorted = [...likes].sort((a, b) => b - a)

      expect(likes).toEqual(sorted)
    })

    test('blogs are arranged in the order according to the likes after clicking Order by likes (lowest first)', async ({ page }) => {
      await page.getByRole('button', { name: 'Order by likes (lowest first)' }).click()

      const blogItems = await page.locator('.blogItem').all()

      for (const blog of blogItems) {
        await blog.getByRole('button', { name: 'view' }).click()
      }

      const likes = []
      for (const blog of blogItems) {
        const likesAmount = await blog.locator('.likesNum').innerText()
        likes.push(Number(likesAmount))
      }

      const sorted = [...likes].sort((a, b) => a - b)

      expect(likes).toEqual(sorted)
    })
    test('blogs are arranged in the order according to the likes after clicking Order by likes (highest first)', async ({ page }) => {
      await page.getByRole('button', { name: 'Order by likes (lowest first)' }).click()
      await page.getByRole('button', { name: 'Order by likes (highest first)' }).click()

      const blogItems = await page.locator('.blogItem').all()
      
      for (const blog of blogItems) {
        await blog.getByRole('button', { name: 'view' }).click()
      }

      const likes = []
      for (const blog of blogItems) {
        const likesAmount = await blog.locator('.likesNum').innerText()
        likes.push(Number(likesAmount))
      }

      const sorted = [...likes].sort((a, b) => b - a)

      expect(likes).toEqual(sorted)
    })
  })
})