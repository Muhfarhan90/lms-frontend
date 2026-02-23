import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui';

export const metadata: Metadata = { title: 'Dashboard Admin | LMS' };

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Dashboard Admin</h1>
      {/* TODO: Tambahkan statistik admin (total user, kursus, dll) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="gap-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">—</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="gap-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Kursus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">—</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="gap-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pendaftaran</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">—</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
