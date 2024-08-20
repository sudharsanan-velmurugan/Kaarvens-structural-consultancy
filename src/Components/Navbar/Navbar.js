import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Navbar/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../../Slice/LoginSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Fetching the login states from the Redux store
  const isUserLogin = useSelector((state) => state.loginInfo.isUserLogin)
  const isAdminLogin = useSelector((state) => state.loginInfo.isAdminLogin)

  // Handle logout functionality
  const handleLogout = () => {
    dispatch(setLogout()) // Dispatching logout action to reset state
    console.log("userbool-",isUserLogin,"adminbool-",isAdminLogin);
    
    navigate('/') // Navigate to homepage
  }

  return (
    <div className='Nav-Container'>
      <ul>
        <li><Link className='nav-elements' to="/">Home</Link></li>
        <li><Link className='nav-elements' to="/About">About</Link></li>
        <li><Link className='nav-elements' to="/Services">Services</Link></li>
        <li><Link className='nav-elements' to="/Contact">Contact</Link></li>

        {/* Conditionally render the Users link for Admin */}
        {isAdminLogin && (
          <li><Link className='nav-elements' to="/users">Users</Link></li>
        )}

        {/* Conditionally render the Forgot, Reset, and Logout buttons */}
        {(isUserLogin || isAdminLogin) && (
          <>
            <li><Link className='nav-elements' to="/Forgot">Forgot</Link></li>
            <li><Link className='nav-elements' to="/Reset">Reset</Link></li>
            <li>
              <button className='nav-elements' onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navbar
