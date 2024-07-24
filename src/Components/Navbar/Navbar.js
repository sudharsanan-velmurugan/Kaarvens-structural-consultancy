import React from 'react'
import '../Navbar/Navbar.css'

const Navbar = () => {
  return (
    <div className='Header-Container'>
        <div >
            <h1>KAARVENS</h1>
        </div>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
        </ul>
    </div>
  )
}

export default Navbar