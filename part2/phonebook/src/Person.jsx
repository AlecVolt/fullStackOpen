const Person = ({ name, number, handlePersonDelete, id }) => {
    return (
        <p>
            {name}: {number}
            <button onClick={() => handlePersonDelete(id)} type='button'>delete</button>
        </p>
    )
}

export default Person;