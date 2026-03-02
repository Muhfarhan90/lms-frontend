'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  Star,
  LogOut,
} from 'lucide-react';
import { cn } from '@utils/cn';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@constants/routes';
import { Role } from '@enums/role.enum';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const adminNav: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard },
  { label: 'Pengguna', href: ROUTES.ADMIN.USERS, icon: Users },
  { label: 'Kursus', href: ROUTES.ADMIN.COURSES, icon: BookOpen },
];

const instructorNav: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.INSTRUCTOR.DASHBOARD, icon: LayoutDashboard },
  { label: 'Kursus Saya', href: ROUTES.INSTRUCTOR.COURSES, icon: BookOpen },
  { label: 'Tugas', href: ROUTES.INSTRUCTOR.ASSIGNMENTS, icon: ClipboardList },
];

const studentNav: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.STUDENT.DASHBOARD, icon: LayoutDashboard },
  { label: 'Kursus', href: ROUTES.STUDENT.COURSES, icon: BookOpen },
  { label: 'Tugas', href: ROUTES.STUDENT.ASSIGNMENTS, icon: ClipboardList },
  { label: 'Nilai', href: ROUTES.STUDENT.GRADES, icon: Star },
];

const navByRole: Record<Role, NavItem[]> = {
  [Role.ADMIN]: adminNav,
  [Role.INSTRUCTOR]: instructorNav,
  [Role.STUDENT]: studentNav,
};

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = user?.role?.name ? (navByRole[user.role.name] ?? []) : [];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <span className="text-lg font-bold text-primary">LMS App</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="border-t border-border p-4">
        <div className="mb-2 px-3">
          <p className="truncate text-xs font-semibold text-foreground">{user?.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
