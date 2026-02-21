import api from "./api";
import type { ApiResponse, PaginatedResponse } from "@appTypes/api.types";
import type { User } from "@appTypes/auth.types";
import type {
  UpdateProfileDto,
  UpdatePasswordDto,
  UserFilter,
} from "@appTypes/user.types";

export const userService = {
  /**
   * Ambil semua user (admin only) — GET /api/users
   */
  getAll: (filters?: UserFilter) =>
    api.get<PaginatedResponse<User>>("/users", { params: filters }),

  /**
   * Ambil detail user — GET /api/users/:id
   */
  getById: (id: number) => api.get<ApiResponse<User>>(`/users/${id}`),

  /**
   * Update profil user — PUT /api/profile
   */
  updateProfile: (data: UpdateProfileDto) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value as string | Blob);
    });
    return api.post<ApiResponse<User>>("/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * Ganti password — PUT /api/profile/password
   */
  updatePassword: (data: UpdatePasswordDto) =>
    api.put<ApiResponse<null>>("/profile/password", data),

  /**
   * Hapus user (admin only) — DELETE /api/users/:id
   */
  delete: (id: number) => api.delete<ApiResponse<null>>(`/users/${id}`),
};
