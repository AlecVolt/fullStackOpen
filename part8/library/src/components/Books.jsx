import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries/books'
import { useState } from 'react'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')

  if (result.loading) {
    return <div>loading...</div>
  }

  const genres = Array.from(
    new Set(
      result.data.allBooks
        .map((b) => b.genres.join(','))
        .join(',')
        .split(',')
    )
  )

  const filterBooks = ({ target }) => {
    setGenre(target.value)
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        <p>
          in genre <b>{genre}</b>
        </p>
        <select value={genre} onChange={filterBooks}>
          <option key={'all'} value="all">
            all
          </option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <th style={{ width: '60%' }}>title</th>
            <th style={{ width: '20%' }}>author</th>
            <th style={{ width: '10%' }}>published</th>
          </tr>
          {genre === 'all'
            ? result.data.allBooks.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))
            : result.data.allBooks
                .filter((b) => b.genres.includes(genre))
                .map((b) => (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
