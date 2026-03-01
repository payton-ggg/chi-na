import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session");

    if (!session) {
      // Not logged in, redirect to login page
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // If logged in and trying to access /admin/login, redirect to /admin
  if (pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session");
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
