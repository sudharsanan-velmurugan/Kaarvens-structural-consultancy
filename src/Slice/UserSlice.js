import {createSlice} from '@reduxjs/toolkit'

const initialState={
    loggedInUser:null,
    AuthorizedUsers:[]
}

export const UserSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
       

        setLoggedInUser:(state,action)=>{
          state.loggedInUser = action.payload
        },
        logoutUser: (state) => {
          state.loggedInUser = null; // Clear user details on logout
        },
        setAuthorizedUsers:(state,action)=>{
          if(!state.AuthorizedUsers.includes(action.payload)){
            state.AuthorizedUsers.push(action.payload)
          }
        },
        removeAuthorizedUsers:(state,action)=>{
          state.AuthorizedUsers= state.AuthorizedUsers.filter((users)=>users!==action.payload) }
    }
})

export const {setLoggedInUser,logoutUser,setAuthorizedUsers,removeAuthorizedUsers} = UserSlice.actions
export default UserSlice.reducer