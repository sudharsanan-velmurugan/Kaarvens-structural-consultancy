import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Slice/UserSlice";
import LoginSlice from "../Slice/LoginSlice";

const store =configureStore({
    reducer:{

        userInfo:UserSlice,
        loginInfo:LoginSlice,
    }
})
export default store