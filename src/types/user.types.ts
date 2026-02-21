import { Role } from "@enums/role.enum";

export interface UpdateProfileDto {
  name?: string;
  email?: string;
  avatar?: File;
}

export interface UpdatePasswordDto {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface UserFilter {
  role?: Role;
  search?: string;
  page?: number;
  per_page?: number;
}
