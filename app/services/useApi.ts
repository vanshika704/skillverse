
import { useCallback } from "react";

const BASE_URL = "/api";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const useApi = () => {
  const request = useCallback(
    async (
      endpoint: string,
      method: Method = "GET",
      body?: any,
      isFormData: boolean = false,
      customHeaders: Record<string, string> = {}
    ) => {
      try {
        const headers: Record<string, string> = {
          ...customHeaders,
        };

        if (!isFormData && !headers["Content-Type"]) {
          headers["Content-Type"] = "application/json";
        }

        const bodyContent = isFormData ? body : body ? JSON.stringify(body) : undefined;

        const res = await fetch(`${BASE_URL}${endpoint}`, {
          method,
          headers,
          body: bodyContent,
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
