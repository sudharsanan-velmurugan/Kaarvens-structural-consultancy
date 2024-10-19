import React, { useEffect, useState } from 'react';

const UseGetByIDMethod = (url) => {

  if (window.confirm("Are you sure you want to delete this project?")) {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        alert("Deleted successfully.");
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Unable to delete project: " + error.message);
      });
  }
  return {}; // Return an object with both data and isLoading

};



export default UseGetByIDMethod;
