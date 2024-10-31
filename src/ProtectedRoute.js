import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

  const userLogin = useSelector((state)=>state.loginInfo.isUserLogin)
  const adminLogin = useSelector((state)=>state.loginInfo.isAdminLogin)

  if(!userLogin && !adminLogin){
    return <Navigate to="/"/>
  }
  return (<Outlet/>)
}

export default ProtectedRoute