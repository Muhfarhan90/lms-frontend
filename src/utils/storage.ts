import { APP_CONFIG } from "@constants/config";

/**
 * Simpan token ke localStorage
 */
export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(APP_CONFIG.TOKEN_KEY, token);
  }
}

/**
 * Ambil token dari localStorage
 */
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(APP_CONFIG.TOKEN_KEY);
  }
  return null;
}

/**
 * Hapus semua data auth dari localStorage
 */
export function clearStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(APP_CONFIG.TOKEN_KEY);
    localStorage.removeItem(APP_CONFIG.USER_KEY);
  }
}
