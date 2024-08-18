import React from 'react'
import About from '../About/About'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    
    <div>
      <About/>
      <div className='links-container'>
      <Link className='nav-elements' to="/signin">Sign in</Link>
      <Link className='nav-elements' to="/login">Login</Link>
    </div> 
     
    </div>
  )
}

export default Home