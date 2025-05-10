import { useState, useEffect } from "react";
import useApi from "../services/useApi";

export const useCourses = () => {
  const { request } = useApi();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async (params = {}) => {
    try {
      setLoading(true);
      const query = new URLSearchParams(params).toString();
      const data = await request(`/courses?${query}`);
      setCourses(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (courseData: any, coverImage?: File) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      Object.entries(courseData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      
      if (coverImage) formData.append("coverImage", coverImage);
      
      const data = await request("/courses", "POST", formData, true);
      return data.data;

    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCourse = async (id: string) => {
    try {
      setLoading(true);
      const data = await request(`/courses/${id}`);
      return data.data;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id: string, courseData: any) => {
    try {
      setLoading(true);
      const data = await request(`/courses/${id}`, "PUT", courseData);
      return data.data;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      setLoading(true);
      await request(`/courses/${id}`, "DELETE");
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
  };
};
