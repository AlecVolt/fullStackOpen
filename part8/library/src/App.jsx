import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client/react'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from './queries/books'
import Notification from './components/Notification'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [notification, setNotification] = useState({ message: null, messageStyle: 'notification' })
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')

    if (token) {
      setToken(token)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

      setNotification({ message: `${addedBook.title} added`, messageStyle: 'notification' })

      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    },
  })

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
              <Link style={{ marginRight: 12 }} to="/recommend">
                recommend
              </Link>
              <Link style={{ marginRight: 12 }} to="/newbook">
                add book
              </Link>
              <button onClick={logout}>logout</button>
            </>
          )}
        </div>
      </div>

      <Notification notification={notification} />

      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/authors" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
        <Route path="/recommend" element={<Recommendations />} />

        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </>
  )
}

export default App
