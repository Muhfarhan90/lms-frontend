import type { Metadata } from 'next';
import { ForgotPasswordForm } from '@components/forms/ForgotPasswordForm';

export const metadata: Metadata = { title: 'Lupa Password | LMS' };

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="mb-2 text-xl font-bold text-foreground">Lupa Password</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Masukkan email terdaftar untuk menerima tautan reset password.
      </p>
      <ForgotPasswordForm />
    </>
  );
}
