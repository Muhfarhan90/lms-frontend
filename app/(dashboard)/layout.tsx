'use client';

import { Sidebar } from '@components/layouts/Sidebar';
import { Navbar } from '@components/layouts/Navbar';

/**
 * Layout dashboard — semua halaman di dalam (dashboard) memakai layout ini
 * Terdiri dari Sidebar di kiri dan konten di kanan
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
