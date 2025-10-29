import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'

import { EDIT_NUMBER } from '../queries/persons'

const NumberForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  const submit = (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, number } })

    setName('')
    setNumber('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data, setError])

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Number <input value={number} onChange={({ target }) => setNumber(target.value)} />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  )
}

export default NumberForm
