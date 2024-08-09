import React from 'react'
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
const Login = () => {
    return (
        <div className='login-page-container'>
            <h1>Login Page</h1>
            <form>
                <div className="user-name-container">
                    <label>User Name</label>
                    <input type="text" placeholder="UserName" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="user-password-container">
                    <label>Password</label>
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon"/>
                </div>
                <div className="login-checkbox">
                <label1><input type="checkbox" /> Remember me</label1>
                    <a href="">forget password</a>
                </div>
                <button type="submit">Log In</button>
                <div className="login-register-link">
                    <p>Don't have any account? <a href="#">Sign In</a></p>
                </div>

            </form>
        </div>
    )
}

export default Login