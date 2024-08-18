import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Navbar/Navbar.css'

const Navbar = () => {
  const [login,setLogin]=useState(true)
  return (
    <div className='Nav-Container'>
      <ul>
        <li> <Link className='nav-elements' to="/">Home</Link></li>
        <li> <Link className='nav-elements' to="/About">About</Link></li>
        <li> <Link className='nav-elements' to="/Services">Services</Link></li>
        <li> <Link className='nav-elements' to="/Contact">Contact</Link></li>
        <li onClick={()=>setLogin(!login)}> <Link className='nav-elements' to="/login">Login</Link> </li>
        { login &&(<><li> <Link className='nav-elements' to="/Forgot">Forgot</Link></li>
        <li> <Link className='nav-elements' to="/Reset">Reset</Link></li>
        <li> <Link className='nav-elements' to="/signin">Sign in</Link> </li>
        <li> <Link className='nav-elements' to="/users">Users</Link> </li></>)}
      </ul>

    </div>
  )
}

export default Navbar