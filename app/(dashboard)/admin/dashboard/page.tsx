import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard Admin | LMS' };

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard Admin</h1>
      {/* TODO: Tambahkan statistik admin (total user, kursus, dll) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Pengguna</p>
          <p className="mt-1 text-3xl font-bold text-gray-800">—</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Kursus</p>
          <p className="mt-1 text-3xl font-bold text-gray-800">—</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Pendaftaran</p>
          <p className="mt-1 text-3xl font-bold text-gray-800">—</p>
        </div>
      </div>
    </div>
  );
}
