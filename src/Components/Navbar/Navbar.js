import React from 'react'
import '../Navbar/Navbar.css'

const Navbar = () => {
  return (
    <div className='Nav-Container'>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
        <li> <a href="">Sign up</a></li>
        <li> <a href="">Login</a> </li>
      </ul>
      
    </div>
  )
}

export default Navbar