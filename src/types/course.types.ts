import { CourseStatus } from "@enums/status.enum";
import { User } from "./auth.types";

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  status: CourseStatus;
  instructor_id: number;
  instructor?: User;
  duration?: number; // in minutes
  total_lessons?: number;
  enrolled_students?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCourseDto {
  title: string;
  description: string;
  thumbnail?: File;
  status: CourseStatus;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {}

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  content?: string;
  video_url?: string;
  order: number;
  duration?: number;
  created_at: string;
  updated_at: string;
}
