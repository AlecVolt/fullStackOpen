import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_PERSONS, CREATE_PERSON } from '../queries/persons'

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    // refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const messages = error.errors.map((e) => e.message).join('\n')
      setError(messages)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        }
      })
    },
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({ variables: { name, street, city, number: number.length > 0 ? number : undefined } })

    setName('')
    setNumber('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          number <input value={number} onChange={({ target }) => setNumber(target.value)} />
        </div>
        <div>
          street <input value={street} onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div>
          city <input value={city} onChange={({ target }) => setCity(target.value)} />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  )
}

export default PersonForm
