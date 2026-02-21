import type { Metadata } from 'next';
import { LoginForm } from '@components/forms/LoginForm';

export const metadata: Metadata = { title: 'Login | LMS' };

export default function LoginPage() {
  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-gray-800">Masuk ke Akun Anda</h1>
      <LoginForm />
    </>
  );
}
