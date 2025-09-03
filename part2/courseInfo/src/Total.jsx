const Total = ({ parts }) => {
    return (
        <p><b>total of {parts.reduce((accum, curr) => (accum + curr.exercises), 0)} exercises</b></p>
    )
}

export default Total;