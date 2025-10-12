const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'log me in' }).click()
}

const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'new note'}).click()
  await page.getByLabel('content').fill(content)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(content).waitFor()
}

export { 
  loginWith,
  createNote
}