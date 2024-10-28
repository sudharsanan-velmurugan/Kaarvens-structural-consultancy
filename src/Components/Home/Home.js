import React from 'react'
import About from '../About/About'
import { Link } from 'react-router-dom'
import './Home.css'
import Slideshow from '../../Background/Slideshow'

const Home = () => {
  return (
    <div>
      <About />
      <div className='links-container'>
        <Link className='nav-elements' style={{borderRadius:"3px"}} to="/signin">Sign in</Link>
        <Link className='nav-elements' style={{borderRadius:"3px"}} to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Home