import { z } from "zod";
import { CourseStatus } from "@enums/status.enum";

export const createCourseSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  status: z.nativeEnum(CourseStatus),
});

export const updateCourseSchema = createCourseSchema.partial();

export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
export type UpdateCourseFormData = z.infer<typeof updateCourseSchema>;
