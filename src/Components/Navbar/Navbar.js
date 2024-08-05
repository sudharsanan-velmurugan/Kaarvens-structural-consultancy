import React from 'react'
import {Link} from 'react-router-dom'
import '../Navbar/Navbar.css'

const Navbar = () => {
  return (
    <div className='Nav-Container'>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
        <li> <Link to="/signin">Sign in</Link> </li>
        <li> <Link to="/login">Login</Link> </li>
      </ul>
      
    </div>
  )
}

export default Navbar