import { forwardRef, useImperativeHandle, useState } from "react"

const Toggable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const hideIsVisible = { display: isVisible ? 'none' : '' }
  const showIsVisible = {display: isVisible ? '' : 'none'}

  const toggleIsVisible = () => {
    setIsVisible(prev => !prev)
  }

  useImperativeHandle(ref,() => {
    return { toggleIsVisible }
  })

  return (
    <>
      <div style={hideIsVisible}>
        <button onClick={toggleIsVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showIsVisible}>
        {props.children}
        <button onClick={toggleIsVisible}>X</button>
      </div>
    </>
  )
})

export default Toggable