import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if request is for a locale route (old structure)
  if (
    pathname.startsWith("/en/") ||
    pathname.startsWith("/am/") ||
    pathname.startsWith("/om/") ||
    pathname.startsWith("/ti/")
  ) {
    // Extract the rest of the path (remove locale prefix)
    const newPath = pathname.replace(/^\/(en|am|om|ti)\//, "/");

    // Create the redirect URL
    const url = request.nextUrl.clone();
    url.pathname = newPath;

    // Return a redirect to the correct route
    return NextResponse.redirect(url);
  }

  // Continue with normal routing for other paths
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
