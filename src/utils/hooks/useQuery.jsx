import { useState, useEffect, useCallback } from "react";

const getQuery = () => {
  return `
  {
    deletedEntities {
      id
      _sender
      _timestamp
    }
    createdEntities {
      id
      _sender
      _message
      _timestamp
    }
  }
  `;
};

export const useQuery = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchApi = useCallback(async () => {
    setLoading(true);
    try {
      const graphURL = process.env.REACT_APP_SUBGRAPH_URL;

      const response = await fetch(graphURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({
          query: getQuery(),
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error({ ERROR: result.errors[0] });
      }
      if (result.data) setData(result.data);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  return {
    data,
    loading,
    refetch: fetchApi,
  };
};
