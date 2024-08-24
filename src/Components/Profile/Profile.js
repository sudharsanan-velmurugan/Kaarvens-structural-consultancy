import React from 'react'
import profileImg from '../../Images/profile.jpg'
import './Profile.css'
const Profile = () => {
  return (
    <div>
       <div className='profile-page-container'>
            <img src={profileImg} alt="Profile img" />
            <label>First Name</label>
            <input type='text'></input>
            <label>Last Name</label>
            <input type='text'></input>
            <label>Email</label>
            <input type='email'></input>
            <label>Mobile No</label>
            <input type='tel'></input>
            <p>Change Password</p>
            <button type='Submit'>Logout</button>

        </div>
    </div>
  )
}

export default Profile