import Filter from "./components/Filter";
import AnecdotesList from "./components/AnecdotesList";
import AddAnecdoteForm from "./components/AddAnecdoteForm";

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
      <Filter />
      <AnecdotesList />

      <h2>Add new</h2>
      <AddAnecdoteForm />
    </>
  )
}

export default App;
