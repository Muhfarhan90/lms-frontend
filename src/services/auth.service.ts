import api from "./api";
import type { ApiResponse } from "@appTypes/api.types";
import type {
  LoginCredentials,
  RegisterData,
  AuthTokens,
  User,
} from "@appTypes/auth.types";

export const authService = {
  /**
   * Login user — POST /api/auth/login
   */
  login: (credentials: LoginCredentials) =>
    api.post<ApiResponse<{ user: User; token: AuthTokens }>>(
      "/auth/login",
      credentials,
    ),

  /**
   * Register user baru — POST /api/auth/register
   */
  register: (data: RegisterData) =>
    api.post<ApiResponse<{ user: User; token: AuthTokens }>>(
      "/auth/register",
      data,
    ),

  forgotPassword: (email: string) =>
    api.post<ApiResponse<null>>("/auth/forgot-password", { email }),

  resetPassword: (payload: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => api.post<ApiResponse<null>>("/auth/reset-password", payload),

  verifyEmail: (
    id: string,
    hash: string,
    params?: { expires?: string; signature?: string },
  ) =>
    api.get<ApiResponse<null>>(`/auth/email/verify/${id}/${hash}`, { params }),

  resendVerificationEmail: () =>
    api.post<ApiResponse<null>>("/auth/email/resend"),

  /**
   * Logout — POST /api/auth/logout (invalidate token di Laravel)
   */
  logout: () => api.post<ApiResponse<null>>("/auth/logout"),

  /**
   * Ambil data user yang sedang login — GET /api/auth/me
   */
  me: () => api.get<ApiResponse<User>>("/auth/me"),
};
