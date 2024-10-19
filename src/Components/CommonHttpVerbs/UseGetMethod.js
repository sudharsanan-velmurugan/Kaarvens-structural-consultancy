import React, { useEffect, useState, useCallback } from 'react';

const UseGetMethod = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State to store any errors

  // Function to fetch data
  const fetchData = useCallback(() => {
    setIsLoading(true); // Set loading state to true before fetching
    setError(null); // Reset any previous errors
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Unable to fetch details: " + err.message);
        setError(err.message); // Store the error message
        setIsLoading(false); // Ensure loading state is disabled even in case of an error
      });
  }, [url]);

  useEffect(() => {
    fetchData(); // Initial fetch when the component mounts or when the URL changes
  }, [fetchData]);

  return { data, isLoading, refetch: fetchData, error }; // Return data, loading state, refetch function, and error
};

export default UseGetMethod;
