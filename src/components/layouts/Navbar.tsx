'use client';

import { Bell } from 'lucide-react';
import { useAuthStore } from '@store/auth.store';
import { Role } from '@enums/role.enum';

const roleLabel: Record<Role, string> = {
  [Role.ADMIN]: 'Administrator',
  [Role.INSTRUCTOR]: 'Instruktur',
  [Role.STUDENT]: 'Mahasiswa',
};

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-base font-semibold text-gray-800">
        {title ?? 'Dashboard'}
      </h1>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role ? roleLabel[user.role] : ''}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
