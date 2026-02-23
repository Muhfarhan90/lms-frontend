import { cn } from '@utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  className?: string;
}

/**
 * Badge / pill label — untuk status kursus, role user, dll
 */
export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    success: 'bg-secondary text-secondary-foreground',
    warning: 'bg-accent text-accent-foreground',
    danger: 'bg-destructive/15 text-destructive',
    info: 'bg-primary/15 text-primary',
    default: 'bg-muted text-muted-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
