import { useQuery } from '@apollo/client/react'
import { ME } from '../queries/users'
import { ALL_BOOKS_BY_GENRE } from '../queries/books'

const Recommendations = () => {
  const userResult = useQuery(ME)
  const genreToSearch = userResult?.data?.me?.favoriteGenre

  const booksResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: genreToSearch },
    skip: !genreToSearch,
  })

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <>
      <h2>Recommendations</h2>
      <p>
        books in your favourite genre <b>{genreToSearch}</b>
      </p>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <th style={{ width: '60%' }}>title</th>
            <th style={{ width: '20%' }}>author</th>
            <th style={{ width: '10%' }}>published</th>
          </tr>
          {booksResult.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Recommendations
