import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
    const users = useSelector((state)=>state.userInfo.users)
  return (
    <div>
            {users.length > 0 ? (
                users.map((user, index) => (
                    <div key={index}>
                        <p>Name: {user.name}</p>
                        <p>Password: {user.pass}</p>
                    </div>
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
  )
}

export default Users