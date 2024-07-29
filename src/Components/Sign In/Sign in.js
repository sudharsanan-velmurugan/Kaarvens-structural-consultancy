import React from 'react'
import './sign in.css'
const Signin = () => {
    return (
        <div className='wrapper'>
            <h1>Sign In Page</h1>
            <form action="">
                <div className="input-box">
                <input type="text" placeholder="First Name" required/>
                </div>
                <div className="input-box">
                <input type="text" placeholder="Last Name"/>
                </div>
                <div className="input-box">
                <input type="password" placeholder="Enter a Password" required/>
                </div>
                <div className="input-box">
                <input type="password" placeholder="Confrim a Password" required/>
                </div>
                <button type="submit">Submit</button>
                <div className="register-link">
                    <p>You already have a account? <a href="#">Login here</a></p>
                </div>
            </form>
        </div>
    )