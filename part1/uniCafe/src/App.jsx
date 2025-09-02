import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h2>statistics</h2>

      {
        (good + neutral + bad) === 0 ? 
        <p>No feedback given</p> :
        <>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {good + neutral + bad}</p>
        <p>
          Average: {(good - bad) / (good + neutral + bad)}
        </p>
        <p>
          Positive: {good / (good + neutral + bad) * 100}%
        </p>
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
        <button onClick={addGood}>good</button>
        <button onClick={addNeutral}>neutral</button>
        <button onClick={addBad}>bad</button>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )

}

export default App;
