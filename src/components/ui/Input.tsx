import { cn } from '@utils/cn';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Reusable Input component dengan label dan error state
 */
export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {props.required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition',
          'placeholder:text-muted-foreground',
          'focus:border-ring focus:ring-2 focus:ring-ring/20',
          error
            ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
            : '',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
