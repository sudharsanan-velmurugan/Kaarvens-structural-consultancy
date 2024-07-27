import React from 'react'
imprt './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
const Login = () => {
    return (
        <div className='wrapper'>
            <h1>Login Page</h1>
            <form action="">
                <div className="input-box">
                    <input type="text" placeholder="User Name" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                <label><input type="checkbox" /> Remember me</label>
                    <a href="">forget password</a>
                </div>
                <button type="submit">Log In</button>
                <div className="register-link">
                    <p>Don't have any account? <a href="#">Sign In</a></p>
                </div>

            </form>
            </div>
        </div>
    )
}

export default Login