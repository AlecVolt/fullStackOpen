const Anecdote = ({ anecdote, handleClick }) => {
  {console.log(anecdote)}
  {console.log('////')}
  return (
    <li>
      {anecdote.text}
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

export default Anecdote