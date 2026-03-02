'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  ClipboardList,
  TrendingUp,
  ChevronRight,
  Shield,
  UserCheck,
  BarChart3,
} from 'lucide-react';
import { useAuthStore } from '@store/auth.store';
import { ROUTES } from '@constants/routes';
import api from '@services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: { name: string };
  is_active: boolean;
  created_at: string;
}

interface AdminStats {
  users: User[];
  courses: { id: number; title: string; enrollments_count?: number; is_published?: boolean }[];
  transactions: { id: number; status: string; amount?: number; created_at: string }[];
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  href?: string;
}) {
  const card = (
    <div className={`rounded-xl border border-border bg-card p-6 shadow-sm flex items-center gap-4 ${href ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}`}>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-2xl font-bold text-foreground">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {href && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
    </div>
  );
  return href ? <Link href={href}>{card}</Link> : card;
}

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [stats, setStats] = useState<AdminStats>({ users: [], courses: [], transactions: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes, txRes] = await Promise.allSettled([
          api.get('/admin/users'),
          api.get('/courses'),
          api.get('/admin/transactions'),
        ]);
        setStats({
          users: usersRes.status === 'fulfilled' ? (usersRes.value.data?.data ?? []) : [],
          courses: coursesRes.status === 'fulfilled' ? (coursesRes.value.data?.data ?? []) : [],
          transactions: txRes.status === 'fulfilled' ? (txRes.value.data?.data ?? []) : [],
        });
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();
  }, []);

  const activeUsers = stats.users.filter((u) => u.is_active).length;
  const publishedCourses = stats.courses.filter((c) => c.is_published).length;
  const pendingTx = stats.transactions.filter((t) => t.status === 'pending').length;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 17) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pantau dan kelola seluruh aktivitas platform LMS.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Administrator</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Pengguna"
          value={isLoading ? '...' : stats.users.length}
          sub={!isLoading ? `${activeUsers} aktif` : undefined}
          color="bg-primary/10 text-primary"
          href={ROUTES.ADMIN.USERS}
        />
        <StatCard
          icon={BookOpen}
          label="Total Kursus"
          value={isLoading ? '...' : stats.courses.length}
          sub={!isLoading ? `${publishedCourses} dipublikasikan` : undefined}
          color="bg-blue-100 text-blue-600"
          href={ROUTES.ADMIN.COURSES}
        />
        <StatCard
          icon={ClipboardList}
          label="Transaksi"
          value={isLoading ? '...' : stats.transactions.length}
          sub={!isLoading && pendingTx > 0 ? `${pendingTx} menunggu verifikasi` : undefined}
          color="bg-accent/20 text-accent-foreground"
        />
        <StatCard
          icon={UserCheck}
          label="Pengguna Aktif"
          value={isLoading ? '...' : activeUsers}
          sub={!isLoading ? `${stats.users.length - activeUsers} nonaktif` : undefined}
          color="bg-green-100 text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pengguna terbaru */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Pengguna Terbaru</h2>
            <Link
              href={ROUTES.ADMIN.USERS}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Lihat semua <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            ) : stats.users.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Belum ada pengguna terdaftar.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {stats.users.slice(0, 5).map((u) => (
                  <li key={u.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {u.name?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{u.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">
                        {u.role?.name ?? '—'}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full ${u.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
                        title={u.is_active ? 'Aktif' : 'Nonaktif'}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Kursus populer */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Kursus Populer</h2>
            <Link
              href={ROUTES.ADMIN.COURSES}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Lihat semua <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            ) : stats.courses.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Belum ada kursus.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {[...stats.courses]
                  .sort((a, b) => (b.enrollments_count ?? 0) - (a.enrollments_count ?? 0))
                  .slice(0, 5)
                  .map((course) => (
                    <li key={course.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{course.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.enrollments_count ?? 0} pendaftar
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                          course.is_published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {course.is_published ? 'Aktif' : 'Draft'}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
