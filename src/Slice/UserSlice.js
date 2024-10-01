import {createSlice} from '@reduxjs/toolkit'

const initialState={
    loggedInUser:null,
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
        }
    }
})

export const {setLoggedInUser,logoutUser} = UserSlice.actions
export default UserSlice.reducer