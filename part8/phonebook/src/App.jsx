import { useApolloClient, useQuery } from '@apollo/client/react'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import { ALL_PERSONS } from './queries/persons'
import { useEffect, useState } from 'react'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('phonenumbers-user-token')
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setError={notify} setToken={setToken} />
      </>
    )
  }

  return (
    <>
      <h1>Hi!</h1>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <PersonsList persons={result.data.allPersons}></PersonsList>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App
