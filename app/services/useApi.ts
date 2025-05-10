import { useCallback } from "react";

const BASE_URL = "/api"; // All API endpoints start from /api

type Method = "GET" | "POST" | "PUT" | "DELETE";

const useApi = () => {
  const request = useCallback(
    async (endpoint: string, method: Method = "GET", body?: any, isFormData: boolean = false) => {
      try {
        const headers: Record<string, string> = {};

        // If we're not sending FormData, set Content-Type to application/json
        if (!isFormData) {
          headers["Content-Type"] = "application/json";
        }

        // Prepare the body based on whether it's FormData or JSON
        const bodyContent = isFormData ? body : body ? JSON.stringify(body) : undefined;

        const res = await fetch(`${BASE_URL}${endpoint}`, {
          method,
          headers,
          body: bodyContent,
        });

        // Parse the response
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
