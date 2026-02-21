import { redirect } from 'next/navigation';
import { ROUTES } from '@constants/routes';

/**
 * Root page  redirect ke halaman login
 * Middleware akan redirect ke dashboard jika sudah login
 */
export default function RootPage() {
  redirect(ROUTES.LOGIN);
}
