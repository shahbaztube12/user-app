import { NextResponse } from "next/server";

// Middleware function
export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/register";
    const token = request.cookies.get('token')?.value || "";

    // Redirect authenticated users away from public pages
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL(path, request.nextUrl));
    }

    // Redirect unauthenticated users trying to access protected pages
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // Allow the request to continue
    return NextResponse.next();
}

// Middleware configuration
export const config = {
    matcher: ["/", "/login", "/register", "/profile"],
};
