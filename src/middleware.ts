// import { createServerClient } from "@supabase/ssr";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export async function updateSession(request: NextRequest) {
  // console.log("HERE IS THE REQUEST:", request);
  const origin = request.nextUrl.origin;
  const supabaseResponse = NextResponse.next({
    request,
  });
  console.log(
    "middleware ran when route changes, can only be seen in terminal not browser",
  );
  const supabase = createMiddlewareClient(
    { req: request, res: supabaseResponse },
    {
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_ANON_KEY!,
    },
    // {
    //   cookies: {
    //     getAll() {
    //       return request.cookies.getAll();
    //     },
    //     setAll(cookiesToSet) {
    //       cookiesToSet.forEach(({ name, value, options }) =>
    //         request.cookies.set(name, value),
    //       );
    //       supabaseResponse = NextResponse.next({
    //         request,
    //       });
    //       cookiesToSet.forEach(({ name, value, options }) =>
    //         supabaseResponse.cookies.set(name, value, options),
    //       );
    //     },
    //   },
    // },
  );

  const isAuthRoute =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/sign-up";

  if (isAuthRoute) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return NextResponse.redirect(
        new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
      );
    }
  }

  // console.log("request.nextURl", request.nextUrl);
  // console.log("Can I look At Just Request??", request);
  // console.log("is auth route??", isAuthRoute);
  const { searchParams, pathname } = new URL(request.url);

  if (!searchParams.get("noteId") && pathname === "/") {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { newestNoteId } = await fetch(
        // `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-newest-note?userId=${user.id}`,
        `${origin}/api/fetch-newest-note?userId=${user.id}`,
      ).then((res) => res.json());

      if (newestNoteId) {
        const url = request.nextUrl.clone();
        url.searchParams.set("noteId", newestNoteId);
        return NextResponse.redirect(url);
      } else {
        const { noteId } = await fetch(
          `${origin}/api/create-new-note?userId=${user.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        ).then((res) => res.json());
        const url = request.nextUrl.clone();
        url.searchParams.set("noteId", noteId);
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
