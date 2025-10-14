const AddButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ name, amount }) => {
  return (
    <tr>
      <td>{name}: </td>
      <td>{amount}</td>
    </tr>
  ) 
}

const Statistics = ({ good, ok, bad }) => {
  return (
    <>
      <h2>statistics</h2>

      {
        (good + ok + bad) === 0 ? 
        <p>No feedback given</p> :
        <>
        <table>
          <tbody>
            <StatisticLine name={'Good'} amount={good} />
            <StatisticLine name={'Ok'} amount={ok} />
            <StatisticLine name={'Bad'} amount={bad} />

            <StatisticLine name={'All'} amount={good + ok + bad} />
            <StatisticLine name={'Average'} amount={(good - bad) / (good + ok + bad)} />
            <StatisticLine name={'Positive'} amount={good / (good + ok + bad) * 100 + '%'} />
          </tbody>
        </table>
        </>
      }
    </>
  )
}

const App = ({ store }) => {
  const addGood = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const addOk = () => {
    store.dispatch({ type: 'OK' })
  }

  const addBad = () => {
    store.dispatch({ type: 'BAD' })
  }

  const makeReset = () => {
    store.dispatch({ type: 'RESET' })
  }

  return (
    <>
      <h2>give feedback</h2>
      <div>
        <AddButton onClick={addGood} text={'good'} />
        <AddButton onClick={addOk} text={'ok'} />
        <AddButton onClick={addBad} text={'bad'} />
        <AddButton onClick={makeReset} text={'reset'} />
      </div>

      <Statistics good={store.getState().good} ok={store.getState().ok} bad={store.getState().bad} />
    </>
  )

}

export default App
