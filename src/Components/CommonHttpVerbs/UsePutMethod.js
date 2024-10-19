import React, { useState } from 'react'

const UsePutMethod = (url,data) => {
  const [submited,setSubmited]=useState(false)
  
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(data), // Send the updated formData
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    })
    .then(() => {
      alert("Updated successfully!");
      setSubmited(true);
    })
    .catch((error) => {
      alert("Unable to update: " + error.message);
      setSubmited(true);
    });
  return {submited}
}

export default UsePutMethod