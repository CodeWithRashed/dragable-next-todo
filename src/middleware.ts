import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isPublicPath = pathName === "/login" || pathName === "/signup";
  const token = request.cookies.get("next-auth.session-token")?.value || "";
  const secureToken = request.cookies.get("__Secure-next-auth.session-token")?.value || "";


  // Redirect to the dashboard if it's not a public path and there's a valid token
  if (!isPublicPath && token || secureToken) {
    return null;
  }

  // Redirect to the login page if it's not a public path and there's no valid token
  if (!isPublicPath && !token || !secureToken) {
    if (pathName === "/") {
      return null; // Allow access to the home page without authentication
    } else {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  // For public paths or when there's a valid token, do nothing and allow the request
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard", "/dashboard/:path*"],
};
