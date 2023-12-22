import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isPublicPath = pathName === "/login" || pathName === "/signup";
  const token = request.cookies.get("next-auth.session-token")?.value || request.cookies.get("__Secure-next-auth.session-token")?.value || "";

  // If there's a valid token and the user is trying to access a public path, redirect to the dashboard
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // If there's no valid token and the user is trying to access a private path, redirect to the login page
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Allow the request to proceed for public paths or when there's a valid token
  return null;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard", "/dashboard/:path*"],
};
