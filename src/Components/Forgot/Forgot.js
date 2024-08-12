import React from 'react'
import './Forgot.css'

const Forgot = () => {
  return (
    <div className='forgot-password-container'>
        <h1>Forgot Password</h1>
        <form>
        <div className='forgot-password'>
            <label>Email Id</label>
            <input type='email' placeholder='Enter Your mail id' required/>
        </div>
        <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default Forgot
