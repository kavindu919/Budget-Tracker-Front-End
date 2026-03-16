import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/budget", "/category", "/transactions"];
const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const hasAnyToken = accessToken || refreshToken;

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !hasAnyToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && hasAnyToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
