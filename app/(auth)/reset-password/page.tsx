import type { Metadata } from 'next';
import { ResetPasswordForm } from '@components/forms/ResetPasswordForm';

export const metadata: Metadata = { title: 'Reset Password | LMS' };

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="mb-2 text-xl font-bold text-foreground">Reset Password</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Masukkan email dan password baru Anda. Jika Anda mengikuti tautan dari email, token dan email akan terisi otomatis.
      </p>
      <ResetPasswordForm />
    </>
  );
}
