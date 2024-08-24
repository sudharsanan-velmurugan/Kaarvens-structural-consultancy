    import React from 'react'
    import './Users.css'
    import { useDispatch, useSelector } from 'react-redux'
    import { deleteUser } from '../../Slice/UserSlice'

    const Users = () => {
        const dispatch = useDispatch()
        const users = useSelector((state)=>state.userInfo.users)
        const removeUser=(index)=>{          
            dispatch(deleteUser(index)) 
        }
    return (
        <div className='users-page-container'>
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={index} className='users-elemts'>
                            <p>Name: {user.name}</p>
                            <p>Password: {user.pass}</p>
                            <button onClick={()=>removeUser(index)}>Delete user</button>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
    )
    }

    export default Users