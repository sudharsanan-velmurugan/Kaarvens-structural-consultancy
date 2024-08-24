import React from 'react'
import profileImg from '../../Images/profile.jpg'
const Profile = () => {
  return (
    <div>
       <h1>Profile</h1> 
        <div>
            <img src={profileImg} alt="Profile img" />
        </div>
        <div>
            <p>First name</p>
            <p>Last name name</p>
            {/* add input box */}
        </div>
        <div>
            <p>Email</p>
        </div>
    </div>
  )
}

export default Profile