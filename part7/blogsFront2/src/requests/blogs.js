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

  return await response.json()
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

  return await response.json()
}

export const removeBlog = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }

  const response = await fetch(`${baseUrl}/${id}`, options)

  if (!response.ok) {
    throw Error('Failed to delete a blog')
  }

  return id
}

export const updateBlog = async (updatedBlog) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBlog),
  }

  const response = await fetch(`${baseUrl}/${updatedBlog.id}`, options)

  if (!response.ok) {
    throw Error('Failed to update a blog')
  }

  return await response.json()
}
