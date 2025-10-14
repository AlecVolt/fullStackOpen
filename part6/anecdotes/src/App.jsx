import AddAnecdoteForm from "./components/AddAnecdoteForm";
import AnecdotesList from "./components/AnecdotesList";

function App() {
  // const showMostVotesAnecdote = () => {
  //   const maxVotes = Math.max(...votes);
  //   return (
  //     <>
  //       <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
  //       <p>has {maxVotes} votes</p>
  //     </>
  //   );
  // }

  return (
    <>
      <h2>Anecdotes</h2>
      <AddAnecdoteForm />
      <AnecdotesList />
    </>
  )
}

export default App;
