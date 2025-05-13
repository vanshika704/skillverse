import { useState, useEffect } from "react";
import useApi from "../services/useApi";
export type WorkshopStatus = 'draft' | 'upcoming';

export interface Workshop {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: 'Online' | 'In-Person' | 'Hybrid';
  maxParticipants: number;
  registered: number;
  status: WorkshopStatus;
}

export type CreateWorkshopData = Omit<Workshop, 'id'>;

export const useLiveWorkshops = () => {
  const { request } = useApi();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkshops = async (params = {}) => {
    try {
      setLoading(true);
      const query = new URLSearchParams(params).toString();
      const data = await request(`/workshops?${query}`);
      setWorkshops(
        data.map((item: any) => ({
          ...item,
          start: new Date(item.start),
          end: new Date(item.end),
        }))
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createWorkshop = async (data: CreateWorkshopData) => {
    try {
      setLoading(true);
      const response = await request("/workshops", "POST", data);
      return response.data as Workshop;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWorkshop = async (id: string) => {
    try {
      setLoading(true);
      const response = await request(`/workshops/${id}`);
      return {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      } as Workshop;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateWorkshop = async (id: string, data: Partial<CreateWorkshopData>) => {
    try {
      setLoading(true);
      const response = await request(`/workshops/${id}`, "PUT", data);
      return response.data as Workshop;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkshop = async (id: string) => {
    try {
      setLoading(true);
      await request(`/workshops/${id}`, "DELETE");
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  return {
    workshops,
    loading,
    error,
    fetchWorkshops,
    createWorkshop,
    getWorkshop,
    updateWorkshop,
    deleteWorkshop,
  };
};
