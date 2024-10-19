import { useEffect, useState } from 'react';

const UseGetByIDMethod = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        return res.json(); // Assuming you're fetching JSON data
      })
      .then((data) => {
        setData(data);
        setIsLoading(false); // Data fetching complete
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false); // Stop loading in case of error
      });
  }, [url]);

  return { data, isLoading, error }; // Return both data, loading, and error state
};

export default UseGetByIDMethod;
