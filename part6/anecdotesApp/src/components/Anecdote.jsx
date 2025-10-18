const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.text} <br />
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

export default Anecdote