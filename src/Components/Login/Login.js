import React from 'react'

const Login = () => {
    return (
        <div>
            <div>
                <h1>Login Page</h1>
            </div>
            <form action="">
                <div>
                    <label >User name</label>
                    <input type="text" />
                </div>
                <div>
                    <label >Pass Word</label>
                    <input type="password" />
                </div>
                <div>
                    <a href="">forget password</a>
                </div>
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default Login