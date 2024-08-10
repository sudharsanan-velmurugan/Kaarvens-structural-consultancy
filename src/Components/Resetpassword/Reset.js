import React from 'react'
import './Reset.css'

const Reset = () => {
  return (
    <div className='reset-page-container'>
      <h1>Reset Password</h1>
      <form>
      <div className='form-group'>
        <label>Enter a New Password</label>
        <input type="password" placeholder='Enter a New Password' required/>
      </div>
      <div className='form-group'>
        <label>Confrim Password</label>
        <input type="password" placeholder='Confrim Password' required/>
      </div>
      <button type='submit'>submit</button>
      </form>     
    </div>
  )
}

export default Reset
 