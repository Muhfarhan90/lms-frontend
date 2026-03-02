import type { Metadata } from 'next';
import { RegisterForm } from '@components/forms/RegisterForm';

export const metadata: Metadata = { title: 'Daftar | LMS' };

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-foreground">Buat Akun Baru</h1>
      <RegisterForm />
    </>
  );
}
