import { useState, useCallback } from "react";
import useApi from "../services/useApi";

export interface LiveSession {
  _id?: string;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
  mode: string;
  address?: string;
  maxParticipants: number;
  registered?: number;
  status: "draft" | "upcoming";
  isPaid: boolean;
  price: number;
}

export function useLive() {
  const { request } = useApi();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LiveSession[] | null>(null);

// Helper to get token and return valid headers
const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {}; 
};


  const getLives = useCallback(
    async (filters?: { mode?: string; status?: string }) => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams(filters as any).toString();
        const endpoint = `/newWorkshop${query ? `?${query}` : ""}`;
        const json = await request(endpoint, "GET", undefined, false, getAuthHeaders());
        if (json.success) {
          setData(json.data);
          return json.data;
        } else {
          throw new Error(json.message);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch sessions");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [request]
  );

  const createLive = useCallback(
    async (live: LiveSession) => {
      setLoading(true);
      setError(null);
      try {
        const json = await request("/newWorkshop", "POST", live, false, getAuthHeaders());
        if (!json.success) throw new Error(json.message);
        return json.data;
      } catch (err: any) {
        setError(err.message || "Failed to create session");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [request]
  );

  const updateLive = useCallback(
    async (id: string, updates: Partial<LiveSession>) => {
      setLoading(true);
      setError(null);
      try {
        const json = await request(`/newWorkshop?id=${id}`, "PUT", updates, false, getAuthHeaders());
        if (!json.success) throw new Error(json.message);
        return json.data;
      } catch (err: any) {
        setError(err.message || "Failed to update session");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [request]
  );

  const deleteLive = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const json = await request(`/newWorkshop?id=${id}`, "DELETE", undefined, false, getAuthHeaders());
        if (!json.success) throw new Error(json.message);
        return true;
      } catch (err: any) {
        setError(err.message || "Failed to delete session");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [request]
  );

  return {
    loading,
    error,
    data,
    getLives,
    createLive,
    updateLive,
    deleteLive,
  };
}
