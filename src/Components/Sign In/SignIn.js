import React from 'react'
import './SignIn.css'

const SignIn = () => {
  return (
    <div className='signin-page-container'>
            <h1>Sign In Page</h1>
            <form >
                <div className="user-name-container">
                <label>First Name</label>
                <input type="text" placeholder="First Name" required/>
                </div>
                <div className="user-name-container">
                <label>Last Name</label>
                <input type="text" placeholder="Last Name"/>
                </div>
                <div className="user-email-container">
                <label>Email id</label>
                <input type="email" placeholder="Email"/>
                </div>
                <div className="user-mobileno-container">
                <label>Mobile Number</label>
                <input type="tel" placeholder="Mobile"/>
                </div>
                <div className="user-pwd-container">
                <label>Enter a Password</label>
                <input type="password" placeholder="Enter a Password" required/>
                </div>
                <div className="user-pwd-container">
                <label>Confrim Password</label>
                <input type="password" placeholder="Confrim a Password" required/>
                </div>
                <div className="signup-checkbox">
                <label1><input type="checkbox"  required/> Agree and Continue</label1>
                </div>
                <button type="submit">Submit</button>
                <div className="login-register-link">
                    <p>You already have a account? <a href="#">Login here</a></p>
                </div>
            </form>
        </div>
  )
}

export default SignIn;

