import api from "./api";
import type { ApiResponse, PaginatedResponse } from "@appTypes/api.types";
import type {
  Course,
  CreateCourseDto,
  UpdateCourseDto,
  Lesson,
} from "@appTypes/course.types";

export const courseService = {
  /**
   * Ambil semua kursus (paginasi) — GET /api/courses
   */
  getAll: (params?: Record<string, unknown>) =>
    api.get<PaginatedResponse<Course>>("/courses", { params }),

  /**
   * Ambil detail 1 kursus — GET /api/courses/:id
   */
  getById: (id: number) => api.get<ApiResponse<Course>>(`/courses/${id}`),

  /**
   * Buat kursus baru — POST /api/courses
   */
  create: (data: CreateCourseDto) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value as string | Blob);
    });
    return api.post<ApiResponse<Course>>("/courses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * Update kursus — PUT /api/courses/:id
   */
  update: (id: number, data: UpdateCourseDto) =>
    api.put<ApiResponse<Course>>(`/courses/${id}`, data),

  /**
   * Hapus kursus — DELETE /api/courses/:id
   */
  delete: (id: number) => api.delete<ApiResponse<null>>(`/courses/${id}`),

  /**
   * Ambil semua lesson dalam kursus — GET /api/courses/:id/lessons
   */
  getLessons: (courseId: number) =>
    api.get<ApiResponse<Lesson[]>>(`/courses/${courseId}/lessons`),
};
