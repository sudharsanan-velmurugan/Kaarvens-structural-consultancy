import React from 'react'
import logoutImg from '../../Images/logout.webp'
import '../Logout/Logout.css'
function Logout() {
  return (
    <div className='logout-page-container'>
        <div className='logout-image'>
            <img src={logoutImg} alt="Logout img" />
            <p> You have sucessfully logged out. </p>
    </div>
    </div>
  )
}

export default Logout
