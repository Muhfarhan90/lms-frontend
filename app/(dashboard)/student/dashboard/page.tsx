'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  ChevronRight,
  GraduationCap,
  Star,
  Play,
} from 'lucide-react';
import { useAuthStore } from '@store/auth.store';
import { ROUTES } from '@constants/routes';
import api from '@services/api';

interface Enrollment {
  id: number;
  course: {
    id: number;
    title: string;
    thumbnail?: string;
    instructor?: { name: string };
  };
  progress?: number;
  created_at: string;
}

interface Certificate {
  id: number;
  course: { title: string };
  issued_at: string;
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

export default function StudentDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollRes, certRes] = await Promise.allSettled([
          api.get('/enrollments'),
          api.get('/certificates'),
        ]);
        if (enrollRes.status === 'fulfilled') {
          setEnrollments(enrollRes.value.data?.data ?? []);
        }
        if (certRes.status === 'fulfilled') {
          setCertificates(certRes.value.data?.data ?? []);
        }
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 17) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  return (
    <div className="space-y-8">
      {/* Header / Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Selamat datang di Learning Management System. Lanjutkan perjalanan belajar Anda hari ini!
          </p>
        </div>
        <Link
          href={ROUTES.STUDENT.COURSES}
          className="hidden sm:flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Jelajahi Kursus
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Kursus Diikuti"
          value={isLoading ? '...' : enrollments.length}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          icon={Award}
          label="Sertifikasi Diperoleh"
          value={isLoading ? '...' : certificates.length}
          color="bg-accent/20 text-accent-foreground"
        />
        <StatCard
          icon={TrendingUp}
          label="Sedang Berlangsung"
          value={isLoading ? '...' : enrollments.filter((e) => (e.progress ?? 0) < 100).length}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={Star}
          label="Selesai"
          value={isLoading ? '...' : enrollments.filter((e) => (e.progress ?? 0) >= 100).length}
          color="bg-green-100 text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Kursus yang diikuti */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Kursus Saya</h2>
            <Link
              href={ROUTES.STUDENT.COURSES}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Lihat semua <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : enrollments.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-12 text-center">
              <GraduationCap className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm font-medium text-foreground">Belum ada kursus</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Mulai belajar dengan mendaftar ke kursus pertama Anda.
              </p>
              <Link
                href={ROUTES.STUDENT.COURSES}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Jelajahi Kursus
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {enrollments.slice(0, 4).map((enrollment) => {
                const progress = enrollment.progress ?? 0;
                return (
                  <div
                    key={enrollment.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Thumbnail / Placeholder */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {enrollment.course.title}
                      </p>
                      {enrollment.course.instructor && (
                        <p className="text-xs text-muted-foreground">
                          {enrollment.course.instructor.name}
                        </p>
                      )}
                      {/* Progress bar */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {progress}%
                        </span>
                      </div>
                    </div>
                    <Link
                      href={ROUTES.STUDENT.COURSE_DETAIL(enrollment.course.id)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Play className="h-3.5 w-3.5 ml-0.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Panel kanan — Sertifikasi & Tips */}
        <div className="space-y-4">
          {/* Sertifikasi terbaru */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-foreground">Sertifikasi</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
              {isLoading ? (
                <div className="h-16 animate-pulse rounded-lg bg-muted" />
              ) : certificates.length === 0 ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <Award className="mb-2 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground">
                    Selesaikan kursus untuk mendapatkan sertifikat.
                  </p>
                </div>
              ) : (
                certificates.slice(0, 3).map((cert) => (
                  <div key={cert.id} className="flex items-center gap-3 rounded-lg bg-accent/10 p-3">
                    <Award className="h-5 w-5 shrink-0 text-accent-foreground" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">{cert.course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(cert.issued_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tips belajar */}
          <div className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Tips Belajar</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Luangkan minimal <span className="font-semibold text-foreground">30 menit</span> setiap hari untuk belajar secara konsisten. Konsistensi adalah kunci keberhasilan!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
