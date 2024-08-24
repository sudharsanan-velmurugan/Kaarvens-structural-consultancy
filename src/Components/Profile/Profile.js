import React from 'react'
import profileImg from '../../Images/profile.jpg'
import './Profile.css'
const Profile = () => {
  return (
    <div className='profile-page-container'>
       <h1>Profile</h1> 
        <div className='profile-page-image'>
            <img src={profileImg} alt="Profile img" />
        </div>
        <div className='profile-page-fname'>
            <label>First Name :</label>
            <input type='text'></input>
        </div>
        <div className='profile-page-lname'>
            <label>Last Name :</label>
            <input type='text'></input>
        </div>
        <div className='profile-page-email'>
            <label>Email Id :   </label>
            <input type='email'></input>
        </div>
        <div className='profile-page-mobileno'>
          <label>Mobile No :</label>
          <input type='tel'></input>
        </div>
        <p>Change Password</p>
        <button type='submit'>Logout</button>
    </div>
  )
}

export default Profile