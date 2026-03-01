'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { authService } from '@services/auth.service';
import { ROUTES } from '@constants/routes';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '@validations/auth.validation';

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await authService.forgotPassword(data.email);
      setSuccessMessage(
        response.data.message ?? 'Link reset password telah dikirim ke email Anda.',
      );
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message ?? 'Gagal mengirim link reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {error && (
        <div className="rounded-lg bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="rounded-lg bg-primary/10 p-3 text-sm text-foreground">
          {successMessage}
        </div>
      )}

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="nama@email.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <Button type="submit" isLoading={isSubmitting} className="mt-2">
        Kirim Link Reset
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Sudah ingat password?{' '}
        <Link href={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
          Kembali ke login
        </Link>
      </p>
    </form>
  );
}
