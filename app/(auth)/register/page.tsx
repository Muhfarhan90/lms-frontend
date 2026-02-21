import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Daftar | LMS' };

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-gray-800">Buat Akun Baru</h1>
      {/* TODO: RegisterForm akan dibuat di src/components/forms/RegisterForm.tsx */}
      <p className="text-sm text-gray-500">Form registrasi akan segera tersedia.</p>
    </>
  );
}
