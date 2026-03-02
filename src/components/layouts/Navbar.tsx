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
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <h1 className="text-base font-semibold text-foreground">
        {title ?? 'Dashboard'}
      </h1>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.role?.name ? roleLabel[user.role.name] : ''}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
