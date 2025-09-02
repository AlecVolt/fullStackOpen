import { useState } from "react"

function App() {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const [ average, setAverage ] = useState(0);
  const [ positive, setPositive ] = useState(0);

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

      <h2>statistics</h2>
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
  )

}

export default App
