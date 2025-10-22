const baseUrl = '/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAllBlogs = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw Error('Failed to fetch blogs')
  }

  return response.json()
}

export const createBlog = async (newBlog) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(newBlog),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw Error('Failed to create a blog')
  }

  return response.json()
}
