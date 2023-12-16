import { useState, useEffect } from "react";

// This hook is used to send a HTTP GET request to the json server
const useGet = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  // Note that the setData hook is returned
  return { data, isLoading, error, setData };
};

export default useGet;
