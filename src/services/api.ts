import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { APP_CONFIG } from "@constants/config";
import { ROUTES } from "@constants/routes";
import { getToken, clearStorage } from "@utils/storage";

/**
 * Axios instance utama — semua request ke Laravel API melalui sini
 * Mirip Http Client di Laravel tapi dari sisi frontend
 */
const api = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: otomatis sisipkan Bearer token ke setiap request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: tangani error global (401 = redirect ke login)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearStorage();
      if (typeof window !== "undefined") {
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
