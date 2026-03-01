'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { loginSchema, type LoginFormData } from '@validations/auth.validation';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@constants/routes';

export function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="flex flex-col gap-4"
      noValidate
    >
      {error && (
        <div className="rounded-lg bg-destructive/15 p-3 text-sm text-destructive">
          {error}
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

      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        required
        {...register('password')}
      />

      <div className="-mt-1 text-right">
        <Link
          href={ROUTES.FORGOT_PASSWORD}
          className="text-xs font-medium text-primary hover:underline"
        >
          Lupa password?
        </Link>
      </div>

      <Button type="submit" isLoading={isLoading} className="mt-2">
        Masuk
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun?{' '}
        <Link href={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
          Daftar
        </Link>
      </p>
    </form>
  );
}
