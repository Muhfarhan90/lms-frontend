"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@services/auth.service";
import { useAuthStore } from "@store/auth.store";
import { ROUTES } from "@constants/routes";
import type { LoginCredentials, RegisterData } from "@appTypes/auth.types";
import { Role } from "@enums/role.enum";

/**
 * Custom hook untuk semua operasi autentikasi
 * Gunakan hook ini di form login/register — bukan panggil authService langsung
 */
export function useAuth() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    setAuth,
    logout: storeLogout,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: res } = await authService.login(credentials);
      // Token dari Sanctum bisa berupa plain string atau object { access_token }
      const token =
        typeof res.data.token === 'string'
          ? res.data.token
          : (res.data.token as { access_token?: string }).access_token ?? String(res.data.token);
      setAuth(res.data.user, token);

      // Redirect berdasarkan role
      const roleName = res.data.user.role?.name;
      if (roleName === Role.ADMIN) router.push(ROUTES.ADMIN.DASHBOARD);
      else if (roleName === Role.INSTRUCTOR) router.push(ROUTES.INSTRUCTOR.DASHBOARD);
      else router.push(ROUTES.STUDENT.DASHBOARD);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message ?? "Login gagal");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: res } = await authService.register(data);
      // Token dari Sanctum bisa berupa plain string atau object
      const token =
        typeof res.data.token === 'string'
          ? res.data.token
          : (res.data.token as { access_token?: string }).access_token ?? String(res.data.token);
      setAuth(res.data.user, token);
      // Setelah register, arahkan ke halaman verifikasi email
      router.push(ROUTES.VERIFY_EMAIL);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message ?? "Registrasi gagal");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // tetap logout walaupun request gagal
    } finally {
      storeLogout();
      router.push(ROUTES.LOGIN);
    }
  };

  return { user, isAuthenticated, isLoading, error, login, register, logout };
}
