import {createSlice} from '@reduxjs/toolkit'

const initialState={
    users:[]
}

export const UserSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUser:(state,action)=>{
          state.users.push(action.payload)  
        },
        deleteUser:(state,action)=>{
          state.users.filter((user)=>{
            return user.name!=action.payload.name
          })
        }
    }
})

export const {addUser,deleteUser} = UserSlice.actions
export default UserSlice.reducer