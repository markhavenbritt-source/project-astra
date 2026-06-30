// AuthProvider — holds the signed-in user for the whole app and exposes
// simple actions: sign in with Google, sign in with email (magic link),
// sign out. It also owns the sign-in sheet's open/closed state so any
// button anywhere can pop it open with openSignIn().

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import SignInSheet from "../components/SignInSheet";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean; // true until we know whether someone is signed in
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  openSignIn: () => void;
  closeSignIn: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    // Get the current session on first load...
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // ...then keep it in sync as the user signs in / out / returns from Google.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
      if (newSession) setSheetOpen(false); // close the sheet once signed in
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  const signInWithEmail = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    return { error: error ? error.message : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value: AuthContextValue = {
    user: session?.user ?? null,
    session,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signOut,
    openSignIn: () => setSheetOpen(true),
    closeSignIn: () => setSheetOpen(false),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <SignInSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </AuthContext.Provider>
  );
};

// Small helper so components can do: const { user, openSignIn } = useAuth();
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
