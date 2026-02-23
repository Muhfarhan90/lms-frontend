import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard Mahasiswa | LMS' };

export default function StudentDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Dashboard Mahasiswa</h1>
      {/* TODO: Kursus yang sedang diikuti */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Kursus Diikuti</p>
          <p className="mt-1 text-3xl font-bold text-foreground">—</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Tugas Pending</p>
          <p className="mt-1 text-3xl font-bold text-foreground">—</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Rata-rata Nilai</p>
          <p className="mt-1 text-3xl font-bold text-foreground">—</p>
        </div>
      </div>
    </div>
  );
}
