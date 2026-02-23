import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard Instruktur | LMS' };

export default function InstructorDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Dashboard Instruktur</h1>
      {/* TODO: Statistik instruktur */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Kursus Aktif</p>
          <p className="mt-1 text-3xl font-bold text-foreground">—</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Mahasiswa</p>
          <p className="mt-1 text-3xl font-bold text-foreground">—</p>
        </div>
      </div>
    </div>
  );
}
