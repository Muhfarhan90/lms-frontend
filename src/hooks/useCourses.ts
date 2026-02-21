"use client";

import { useState, useCallback } from "react";
import { courseService } from "@services/course.service";
import type { Course } from "@appTypes/course.types";

/**
 * Hook untuk fetch dan manage daftar kursus
 */
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCourses = useCallback(async (params?: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: res } = await courseService.getAll(params);
      setCourses(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
      setTotal(res.data.total);
    } catch {
      setError("Gagal memuat kursus");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCourse = async (id: number) => {
    await courseService.delete(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setTotal((prev) => prev - 1);
  };

  return {
    courses,
    isLoading,
    error,
    currentPage,
    lastPage,
    total,
    fetchCourses,
    deleteCourse,
  };
}
