import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
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
          <Link style={{ marginRight: 12 }} to="/newbook">
            add book
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
      </Routes>
    </>
  )
}

export default App
