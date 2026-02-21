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

  const navItems = user ? navByRole[user.role] : [];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <span className="text-lg font-bold text-blue-600">LMS App</span>
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
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
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
      <div className="border-t border-gray-200 p-4">
        <div className="mb-2 px-3">
          <p className="truncate text-xs font-semibold text-gray-800">{user?.name}</p>
          <p className="truncate text-xs text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
