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
         state.users= state.users.filter((user,index)=>{
            return index !== action.payload
          })
        }
    }
})

export const {addUser,deleteUser} = UserSlice.actions
export default UserSlice.reducer