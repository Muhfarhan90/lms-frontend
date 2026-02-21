export const APP_CONFIG = {
  APP_NAME: "LMS - Learning Management System",
  APP_VERSION: "1.0.0",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  DEFAULT_PER_PAGE: 10,
  TOKEN_KEY: "lms_token",
  USER_KEY: "lms_user",
} as const;
