'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  Star,
  BarChart3,
  ChevronRight,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';
import { useAuthStore } from '@store/auth.store';
import { ROUTES } from '@constants/routes';
import api from '@services/api';

interface Course {
  id: number;
  title: string;
  enrollments_count?: number;
  rating?: number;
  is_published?: boolean;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex items-center gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function InstructorDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/instructor/courses');
        setCourses(res.data?.data ?? []);
      } catch {
        // gracefully handle
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();
  }, []);

  const totalStudents = courses.reduce((acc, c) => acc + (c.enrollments_count ?? 0), 0);
  const publishedCount = courses.filter((c) => c.is_published).length;

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
            Kelola kursus Anda dan pantau perkembangan mahasiswa.
          </p>
        </div>
        <Link
          href={ROUTES.INSTRUCTOR.COURSE_CREATE}
          className="hidden sm:flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Buat Kursus Baru
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Total Kursus"
          value={isLoading ? '...' : courses.length}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          icon={TrendingUp}
          label="Kursus Aktif"
          value={isLoading ? '...' : publishedCount}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={Users}
          label="Total Mahasiswa"
          value={isLoading ? '...' : totalStudents}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={Star}
          label="Rata-rata Rating"
          value={isLoading ? '...' : courses.length > 0
            ? (courses.reduce((a, c) => a + (c.rating ?? 0), 0) / courses.length).toFixed(1)
            : '—'}
          color="bg-accent/20 text-accent-foreground"
        />
      </div>

      {/* Kursus Saya */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Kursus Saya</h2>
          <Link
            href={ROUTES.INSTRUCTOR.COURSES}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Lihat semua <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-14 text-center">
            <BookOpen className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">Belum ada kursus</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Mulai berbagi ilmu dengan membuat kursus pertama Anda.
            </p>
            <Link
              href={ROUTES.INSTRUCTOR.COURSE_CREATE}
              className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Buat Kursus
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <p className="line-clamp-2 text-sm font-semibold text-foreground leading-snug">
                    {course.title}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      course.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {course.is_published ? 'Aktif' : 'Draft'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.enrollments_count ?? 0} mahasiswa
                  </span>
                  {course.rating !== undefined && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {course.rating.toFixed(1)}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={ROUTES.INSTRUCTOR.COURSE_DETAIL(course.id)}
                    className="flex-1 rounded-lg border border-border px-3 py-1.5 text-center text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Detail
                  </Link>
                  <Link
                    href={ROUTES.INSTRUCTOR.COURSE_EDIT(course.id)}
                    className="flex-1 rounded-lg bg-primary/10 px-3 py-1.5 text-center text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
