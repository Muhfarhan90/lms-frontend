import { APP_CONFIG } from "@constants/config";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

/**
 * Simpan token ke localStorage DAN cookie
 * Cookie diperlukan agar middleware Next.js (server-side) bisa membacanya
 */
export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(APP_CONFIG.TOKEN_KEY, token);
    // Set cookie agar middleware bisa membaca token
    document.cookie = `${APP_CONFIG.TOKEN_KEY}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }
}

/**
 * Ambil token dari localStorage (untuk request API di client-side)
 */
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(APP_CONFIG.TOKEN_KEY);
  }
  return null;
}

/**
 * Hapus semua data auth dari localStorage DAN cookie
 */
export function clearStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(APP_CONFIG.TOKEN_KEY);
    localStorage.removeItem(APP_CONFIG.USER_KEY);
    // Hapus cookie dengan mengset max-age = 0
    document.cookie = `${APP_CONFIG.TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }
}
