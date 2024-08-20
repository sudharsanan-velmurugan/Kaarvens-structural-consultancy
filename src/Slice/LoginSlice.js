import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isUserLogin:false,
    isAdminLogin:false
}

export const LoginSlice = createSlice(
    {
        name:"isLogin",
        initialState,
        reducers:{
            setUserLogin:(state)=>{
                state.isUserLogin =true
                state.isAdminLogin = false
            },
            setAdminLogin:(state)=>{
                state.isUserLogin =false
                state.isAdminLogin =true
            },
            setLogout:(state)=>{
                state.isUserLogin = false
                state.isAdminLogin=false
            }
        }
    }
)
export const {setUserLogin,setAdminLogin,setLogout} = LoginSlice.actions
export default LoginSlice.reducer