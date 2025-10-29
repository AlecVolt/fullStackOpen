import { useMutation, useQuery } from '@apollo/client/react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries/authors'
import { useState } from 'react'

const Authors = ({ token }) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, setBornTo: birthYear } })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <div>
          <h3>Set birth year</h3>
          <form onSubmit={submit}>
            {/* <div>
            <label>
              name
              <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
            </label>
          </div> */}
            <div>
              <select value={name} onChange={({ target }) => setName(target.value)}>
                {result.data.allAuthors.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>
                born
                <input type="text" value={birthYear} onChange={({ target }) => setBirthYear(Number(target.value))} />
              </label>
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authors
