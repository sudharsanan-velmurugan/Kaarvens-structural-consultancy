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
        <section className='users-page-container'>
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={index} className='users-elements'>
                            <p>Name: {user.name}</p>
                            <p>Password: {user.pass}</p>
                            <button onClick={()=>removeUser(index)}>Delete user</button>
                        </div>
                    ))
                ) : (
                    <p className='users-elements'>No users found</p>
                )}
            </section>
    )
    }

    export default Users