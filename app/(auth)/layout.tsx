import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autentikasi | LMS',
};

/**
 * Layout untuk halaman auth (login, register)
 * Tanpa sidebar — hanya tampilan card di tengah layar
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-primary">LMS App</h2>
          <p className="mt-1 text-sm text-muted-foreground">Learning Management System</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
