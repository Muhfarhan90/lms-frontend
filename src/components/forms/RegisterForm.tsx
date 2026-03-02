"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/Button";
import { registerSchema, type RegisterFormData } from "@validations/auth.validation";
import type { RegisterData } from "@appTypes/auth.types";
import { useAuth } from "@hooks/useAuth";
import { ROUTES } from "@constants/routes";

export function RegisterForm() {
  // Gunakan useAuth hook — sama seperti LoginForm, token tersimpan secara konsisten
  const { register: registerUser, isLoading, error } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    void registerUser(data as unknown as RegisterData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {error && <div className="rounded-lg bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

      <Input id="name" label="Nama" error={errors.name?.message} required {...register("name")} />

      <Input id="email" label="Email" type="email" error={errors.email?.message} required {...register("email")} />

      <Input id="password" label="Password" type="password" error={errors.password?.message} required {...register("password")} />

      <Input id="password_confirmation" label="Konfirmasi Password" type="password" error={errors.password_confirmation?.message} required {...register("password_confirmation")} />

      <Input id="nisn" label="NISN (opsional)" error={errors.nisn?.message} {...register("nisn")} />

      <Input id="school_origin" label="Asal Sekolah (opsional)" error={errors.school_origin?.message} {...register("school_origin")} />

      <Button type="submit" isLoading={isLoading}>Daftar</Button>

      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{' '}
        <Link href={ROUTES.LOGIN} className="font-medium text-primary hover:underline">Masuk</Link>
      </p>
    </form>
  );
}
