import { Role } from "@enums/role.enum";

export interface UserRole {
  id: number;
  name: Role; // "admin" | "instructor" | "student"
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole; // object { id, name } dari UserResource
  nisn?: string | null;
  phone?: string | null;
  address?: string | null;
  school_origin?: string | null;
  avatar?: string | null;
  is_active?: boolean;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: Role;
  nisn?: string | null;
  school_origin?: string | null;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
  expires_in?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
