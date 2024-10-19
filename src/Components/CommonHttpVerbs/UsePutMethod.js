import React, { useState } from "react";


const UsePutMethod = (url, data) => {
  const [submitted, setSubmitted] = useState(false);

  const putRequest = async () => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json-patch+json", // Set the correct content-type
        },
        mode: "cors",
        body: JSON.stringify(data), // Send the data as JSON in the body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Updated successfully!");
      setSubmitted(true); // Set submission state to true after successful update
      return response;
    } catch (error) {
      alert("Unable to update: " + error.message);
      setSubmitted(true); // Set submission state even if the update fails
      return null;
    }
  };

  return { submitted, putRequest }; // Return the submission state and the function to call the PUT request
};

export default UsePutMethod;
