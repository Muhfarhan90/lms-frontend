import type { Metadata } from 'next';
import { VerifyEmailForm } from '@components/forms/VerifyEmailForm';

export const metadata: Metadata = { title: 'Verifikasi Email | LMS' };

export default function VerifyEmailPage() {
  return (
    <>
      <h1 className="mb-2 text-xl font-bold text-foreground">Verifikasi Email</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Selesaikan verifikasi email untuk melanjutkan penggunaan akun Anda.
      </p>
      <VerifyEmailForm />
    </>
  );
}
