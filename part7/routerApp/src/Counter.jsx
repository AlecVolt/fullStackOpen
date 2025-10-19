import { useCounter } from "./hooks/useCounter"

const Counter = () => {
  const counter = useCounter()

  const right = useCounter()
  const left = useCounter()

  return (
    <>
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>
          plus
        </button>
        <button onClick={counter.decrease}>
          minus
        </button>      
        <button onClick={counter.zero}>
          zero
        </button>
      </div>

      <div>
        <div>{right.value}</div>
        <button onClick={right.increase}>plus right</button>
      </div>
      <div>
        <div>{left.value}</div>
        <button onClick={left.increase}>plus left</button>
      </div>
    </>
  )
}

export default Counter