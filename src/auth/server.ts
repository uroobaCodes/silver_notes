import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const client = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );
  return client;
}

export async function getUser() {
  const { auth } = await createClient();
  const userObject = await auth.getUser();

  // Log only if there's an actual Supabase error
  // if (userObject.error) {
  //   console.error("Supabase error while fetching user:", userObject.error);
  //   return null;
  // }
  if (userObject.error) {
    if (userObject.error.name === "AuthSessionMissingError") {
      return null; // no session, not really an error
    }
    console.error("Supabase error while fetching user:", userObject.error);
    return null;
  }
  // If user is simply not logged in, just return null (no logging needed)
  if (!userObject.data?.user) return null;

  return userObject.data.user;
}
