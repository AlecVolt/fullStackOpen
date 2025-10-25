import { forwardRef, useImperativeHandle, useState } from 'react'
import { StyledButton } from './StyledComponents'

const Toggable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const hideIsVisible = { display: isVisible ? 'none' : '' }
  const showIsVisible = { display: isVisible ? '' : 'none' }

  const toggleIsVisible = () => {
    setIsVisible((prev) => !prev)
  }

  useImperativeHandle(ref, () => {
    return { toggleIsVisible }
  })

  return (
    <>
      <div style={hideIsVisible}>
        <StyledButton onClick={toggleIsVisible}>{props.buttonLabel}</StyledButton>
      </div>
      <div style={showIsVisible}>
        {props.children}
        <StyledButton onClick={toggleIsVisible}>X</StyledButton>
      </div>
    </>
  )
})

export default Toggable
