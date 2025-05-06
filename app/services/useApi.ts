import { useCallback } from "react";

const BASE_URL = "/api"; // All API endpoints start from /api

type Method = "GET" | "POST" | "PUT" | "DELETE";

const useApi = () => {
  const request = useCallback(
    async (endpoint: string, method: Method = "GET", body?: any) => {
      try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        return data;
      } catch (err: any) {
        throw new Error(err.message);
      }
    },
    []
  );

  return { request };
};

export default useApi;