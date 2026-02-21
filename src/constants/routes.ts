export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Admin
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    USER_CREATE: "/admin/users/create",
    USER_DETAIL: (id: number) => `/admin/users/${id}`,
    COURSES: "/admin/courses",
  },

  // Instructor
  INSTRUCTOR: {
    DASHBOARD: "/instructor/dashboard",
    COURSES: "/instructor/courses",
    COURSE_CREATE: "/instructor/courses/create",
    COURSE_DETAIL: (id: number) => `/instructor/courses/${id}`,
    COURSE_EDIT: (id: number) => `/instructor/courses/${id}/edit`,
    ASSIGNMENTS: "/instructor/assignments",
  },

  // Student
  STUDENT: {
    DASHBOARD: "/student/dashboard",
    COURSES: "/student/courses",
    COURSE_DETAIL: (id: number) => `/student/courses/${id}`,
    ASSIGNMENTS: "/student/assignments",
    GRADES: "/student/grades",
  },
} as const;
