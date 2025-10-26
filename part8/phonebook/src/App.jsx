import { useQuery } from '@apollo/client/react'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import { ALL_PERSONS } from './queries/persons'
import { useState } from 'react'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <>
      <h1>Hi!</h1>
      <Notify errorMessage={errorMessage} />
      <PersonsList persons={result.data.allPersons}></PersonsList>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App
