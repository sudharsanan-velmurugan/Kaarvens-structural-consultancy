import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLogin:false
}

export const LoginSlice = createSlice(
    {
        name:"isLogin",
        initialState,
        reducers:{
            setLogin:(state,action)=>{
                state.isLogin =!state.isLogin
            }
        }
    }
)
export const {setLogin} = LoginSlice.actions
export default LoginSlice.reducer