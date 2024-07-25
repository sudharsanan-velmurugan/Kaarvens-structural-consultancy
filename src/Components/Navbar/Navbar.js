import React from 'react'
import '../Navbar/Navbar.css'

const Navbar = () => {
  return (
    <div className='Header-Container'>
        <div >
            <h1>KAARVENS</h1>
        </div>
        <ul>
            <li><h2>Home</h2></li>
            <li><h2>About</h2></li>
            <li><h2>Services</h2></li>
            <li><h2>Contact</h2></li>
        </ul>
    </div>
  )
}

export default Navbar