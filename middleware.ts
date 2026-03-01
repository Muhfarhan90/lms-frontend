import { type NextRequest, NextResponse } from "next/server";
import { APP_CONFIG } from "./src/constants/config";
import { ROUTES } from "./src/constants/routes";

/**
 * Middleware — berjalan sebelum setiap request
 * Mirip Auth Middleware di Laravel, tapi di sisi frontend
 *
 * Fungsi:
 * - Redirect ke /login jika tidak ada token
 * - Redirect ke dashboard jika sudah login tapi mengakses halaman auth
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get(APP_CONFIG.TOKEN_KEY)?.value;
  const { pathname } = request.nextUrl;

  const guestOnlyPages = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.FORGOT_PASSWORD,
    "/reset-password",
  ];

  const publicPages = [...guestOnlyPages, ROUTES.VERIFY_EMAIL];

  const isGuestOnlyPage = guestOnlyPages.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicPage = publicPages.some((route) => pathname.startsWith(route));

  // Sudah login tapi akses halaman auth → redirect ke student dashboard (default)
  if (token && isGuestOnlyPage) {
    return NextResponse.redirect(
      new URL(ROUTES.STUDENT.DASHBOARD, request.url),
    );
  }

  // Belum login tapi akses halaman protected → redirect ke login
  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Jalankan middleware hanya pada route berikut (bukan _next, api, assets, dll)
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
