// Supabase client — the single connection your whole app uses.
// Reads its two values from environment variables (never hard-coded here),
// so the same code works in local dev and on Cloudflare Pages.

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // A clear console message if the env vars aren't set yet, instead of a
  // cryptic crash. See INTEGRATION-GUIDE.md for where to set these.
  console.error(
    "Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(url ?? "", anonKey ?? "");
