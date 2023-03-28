import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";

// const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const axios = require("axios");

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "89f6f2ca92msh7d4208c39729306p1cf3e9jsnac5f957428d2",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };

  const fetchData = async (retryCount = 0) => {
    setIsLoading(true);

    // const timeout = setTimeout(() => {
    //   options;
    // }, 1000);

    //ONE!!!!!
    //   try {
    //     const response = await axios.request(options);

    //     setData(response.data.data);
    //     // setIsLoading(true);
    //   } catch (error) {
    //     setError(error);
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    //TWO!!
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response?.status === 429 && retryCount < 3) {
        const waitSeconds = Math.pow(2, retryCount);
        console.log(`rate limited, retrying in ${waitSeconds} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
        fetchData(retryCount + 1);
      } else {
        setError(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const refetch = () => {
  //   setIsLoading(true);
  //   fetchData();
  // };

  return { data, isLoading, error };
};

// return { data, isLoading, error, refetch };

export default useFetch;

//\\\three!!!!
// useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.request(options);
//       const data = await response.data();

//       // Set stats
//       setIsLoading(false);
//       setData(data);
//     };
//     fetchData();

//     // Passing URL as a dependency
//   }, [options]);

//   const refetch = () => {
//     setIsLoading(true);
//     fetchData();
//   };

//   // Return 'isLoading' not the 'setIsLoading' function
//   return [data, isLoading, refetch];
// };

// return { data, isLoading, error, refetch };
// };
