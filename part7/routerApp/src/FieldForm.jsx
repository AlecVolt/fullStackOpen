import { useField } from "./hooks/useField"

const FieldForm = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <FieldForm>
        name: 
        <input
          {...name}
        /> 
        <br/> 
        birthdate:
        <input
          {...born}
        />
        <br /> 
        height:
        <input
          {...height}
        />
      </FieldForm>
      <div>
        {name.value} {born.value} {height.value} 
      </div>
    </div>
  )
}

export default FieldForm