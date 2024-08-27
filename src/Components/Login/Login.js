import React, { useState } from 'react'
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate ,Link} from 'react-router-dom';
import { setAdminLogin,setUserLogin } from '../../Slice/LoginSlice';
const Login = () => {
    const users = useSelector((state) => state.userInfo.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const handleLogin = (e) => {
        e.preventDefault()
        const userFound = users.find((user) => user.firstName === name && user.password === pass)
        if (name === 'admin' & pass === 'admin@123') {
            alert("you logged in as a admin")
            dispatch(setAdminLogin())
            navigate('/users')
        }
        else if (userFound) {
            alert('You are logged in as a user')
            dispatch(setUserLogin())
            navigate('/Services')
        }
        else {
            alert("invalid login id or pass")
            navigate('/')
        }
    }
    return (
        <div className='login-page-container'>
            <h1>Login Page</h1>
            <form>
                <div className="user-name-container">
                    <label>User Name</label>
                    <input type="text" placeholder="UserName" onChange={(e) => setName(e.target.value)} required />
                    <FaUser className="icon" />
                </div>
                <div className="user-password-container">
                    <label>Password</label>
                    <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} required />
                    <FaLock className="icon" />
                </div>
                <div className="login-checkbox">
                    <label1><input type="checkbox" /> Remember me</label1>
                    <Link to='/forgot'>forget password</Link>
                </div>
                <button type="submit" onClick={handleLogin}>Log In</button>
                <div className="login-register-link">
                    <p>Don't have any account? <Link to='/signin' >Sign In</Link></p>
                </div>

            </form>
        </div>
    )
}

export default Login