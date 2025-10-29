const Person = ({ person, onClose }) => {
  console.log(person)

  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.number}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

export default Person
