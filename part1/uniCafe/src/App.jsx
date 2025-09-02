import { useState } from "react";

const AddButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ name, amount }) => {
  return (
    <p>{name}: {amount}</p>
  ) 
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h2>statistics</h2>

      {
        (good + neutral + bad) === 0 ? 
        <p>No feedback given</p> :
        <>
        <StatisticLine name={'Good'} amount={good} />
        <StatisticLine name={'Neutral'} amount={neutral} />
        <StatisticLine name={'Bad'} amount={bad} />
        
        <StatisticLine name={'All'} amount={good + neutral + bad} />
        <StatisticLine name={'Average'} amount={(good - bad) / (good + neutral + bad)} />
        <StatisticLine name={'Positive'} amount={good / (good + neutral + bad) * 100 + '%'} />
        </>
      }
    </>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const addGood = () => {
    setGood(good => good + 1);
  }

  const addNeutral = () => {
    setNeutral(neutral => neutral + 1);
  }

  const addBad = () => {
    setBad(bad => bad + 1);
  }

  return (
    <>
      <h2>give feedback</h2>
      <div>
        <AddButton onClick={addGood} text={'good'} />
        <AddButton onClick={addNeutral} text={'neutral'} />
        <AddButton onClick={addBad} text={'bad'} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )

}

export default App;
