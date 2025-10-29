import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useApolloClient } from '@apollo/client/react'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')

    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.clearStore()
  }

  return (
    <>
      <div>
        <div style={{ marginBottom: 10 }}>
          <Link style={{ marginRight: 12 }} to="/authors">
            authors
          </Link>
          <Link style={{ marginRight: 12 }} to="/books">
            books
          </Link>
          {!token ? (
            <Link style={{ marginRight: 12 }} to="/login">
              login
            </Link>
          ) : (
            <>
              <Link style={{ marginRight: 12 }} to="/newbook">
                add book
              </Link>
              <button onClick={logout}>logout</button>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/authors" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />

        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </>
  )
}

export default App
