import React, { useEffect, useState } from "react";
import "./Users.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Slice/UserSlice";

const Users = () => {

  

  const [userDetails,setUserDetails] = useState([])

  const GetUserDeteils = ()=>{
    fetch("https://localhost:7175/api/UserDetails",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        mode:"cors"
    })
    .then((res)=>{
        if(!res.ok){
            throw new Error()
            
        }
        return res.json()
    })
    .then((data)=>{
        setUserDetails(data)
    })
    .catch((error)=>{
        console.error("Fetch error:", error);
        alert("Unable to get data: " + error.message);
    })
  }
  useEffect(()=>{
    GetUserDeteils()
  },[])
  const handelDelete = (id)=>{
    
    if(window.confirm("Are you sure want to delete user ?")){
        fetch(`https://localhost:7175/api/UserDetails/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            mode:"cors"
        })
        .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // Remove deleted user from the UI
           setUserDetails((prev)=>prev.filter((user)=>user.id!==id))
            alert("user deleted successfully.");
          })
          .catch((error) => {
            console.error("Delete error:", error);
            alert("Unable to delete user: " + error.message);
          });
    }
  }
  return (
    <section className="users-page-container">
     {userDetails.length>0? (
        userDetails.map((user)=>(
            <ul className="users-elements" key={user.id}>
            <li><span className="label">User ID:</span> <span className="label-value">{user.id}</span></li>
            <li><span className="label">First Name:</span> <span className="label-value">{user.firstName}</span></li>
            <li><span className="label">Last Name:</span> <span className="label-value">{user.lastName}</span></li>
            <li><span className="label">Email:</span> <span className="label-value">{user.email}</span></li>
            <li><span className="label">Mobile No:</span> <span className="label-value">{user.mobileNo}</span></li>
            <li><span className="label">Password:</span> <span className="label-value">{user.password}</span></li>
            <button onClick={()=>handelDelete(user.id)}>Delete</button>
          </ul>
          
        ))
        ):(<p className="users-elements">No users found</p>)}
    </section>
  );
};

export default Users;
