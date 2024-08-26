import {createSlice} from '@reduxjs/toolkit'

const initialState={
    users:[],
    loggedInUser:null,
}

export const UserSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUser:(state,action)=>{
          state.users.push(action.payload)  
        },

        setLoggedInUser:(state,action)=>{
          state.loggedInUser = action.payload
        },
        deleteUser:(state,action)=>{
         state.users= state.users.filter((user,index)=>{
            return index !== action.payload
          })
        }
    }
})

export const {addUser,deleteUser,setLoggedInUser} = UserSlice.actions
export default UserSlice.reducer