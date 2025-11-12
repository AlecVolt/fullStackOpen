const Total = ({ totalExercises }: { totalExercises: number }) => {
  return <p style={{ marginTop: 32, fontWeight: 'bold', fontSize: '1.8em' }}>Number of exercises {totalExercises}</p>;
};

export default Total;
