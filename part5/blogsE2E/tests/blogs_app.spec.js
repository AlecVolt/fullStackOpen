const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blogs App', () => {
  beforeEach(async ({ page }) => {
    page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText("Hi! I'm a blog list app!")).toBeVisible()
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
})