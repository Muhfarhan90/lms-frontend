"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/Button";
import { resetPasswordSchema, type ResetPasswordFormData } from "@validations/auth.validation";
import { authService } from "@services/auth.service";
import { ROUTES } from "@constants/routes";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const defaultValues = {
    token: searchParams.get("token") ?? "",
    email: searchParams.get("email") ?? "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
  });

  useEffect(() => {
    // If search params change, reset form defaults
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("token"), searchParams.get("email")]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await authService.resetPassword(data);
      setSuccessMessage(res.data.message ?? "Password berhasil direset. Silakan login kembali.");
      // redirect to login after short delay
      setTimeout(() => router.push(ROUTES.LOGIN), 1500);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message ?? "Gagal mereset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {error && <div className="rounded-lg bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}
      {successMessage && <div className="rounded-lg bg-primary/10 p-3 text-sm text-foreground">{successMessage}</div>}

      <Input id="token" label="Token" type="text" error={errors.token?.message} {...register("token")} hidden />

      <Input id="email" label="Email" type="email" placeholder="nama@email.com" error={errors.email?.message} required {...register("email")} />

      <Input id="password" label="Password Baru" type="password" placeholder="••••••••" error={errors.password?.message} required {...register("password")} />

      <Input id="password_confirmation" label="Konfirmasi Password" type="password" placeholder="••••••••" error={errors.password_confirmation?.message} required {...register("password_confirmation")} />

      <Button type="submit" isLoading={isSubmitting}>Reset Password</Button>
    </form>
  );
}
