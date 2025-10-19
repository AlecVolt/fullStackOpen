import { Link } from 'react-router-dom'
const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    // <div>
    //   <a href='#' style={padding}>anecdotes</a>
    //   <a href='#' style={padding}>create new</a>
    //   <a href='#' style={padding}>about</a>
    // </div>

    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

export default Menu