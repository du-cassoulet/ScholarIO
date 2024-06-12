import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (!req.cookies.has("token")) {
    return NextResponse.redirect(new URL("/login", req.url).toString());
  }

  try {
    const res = await fetch("http://127.0.0.1:8080/api/auth", {
      headers: {
        "Content-Type": "application/json",
        Authorization: req.cookies.get("token")!.value,
      },
    });

    if (!res.ok) {
      req.cookies.delete("token");
      return NextResponse.redirect(new URL("/login", req.url).toString());
    }

    return NextResponse.next();
  } catch {
    req.cookies.delete("token");
    return NextResponse.redirect(new URL("/login", req.url).toString());
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
};
