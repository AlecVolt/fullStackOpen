const baseUrl = '/api/login'

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('username or password invalid')
  }

  return response.json()
}
