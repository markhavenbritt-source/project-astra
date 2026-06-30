// SignInSheet — a bottom sheet that slides up to offer Google + email sign-in.
// Styled with the app's existing design tokens (font-display, green-400, etc.)
// so it matches BINARY. It's rendered once globally by AuthProvider; open it
// from anywhere with openSignIn().

import { useState, type FormEvent } from "react";
import { useAuth } from "../lib/AuthProvider";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SignInSheet = ({ open, onClose }: Props) => {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error } = await signInWithEmail(email.trim());
    setBusy(false);
    if (error) setError(error);
    else setSent(true);
  };

  return (
    <div
      className={`fixed inset-0 z-[200] transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Dim backdrop — tap to close */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 mx-auto max-w-md bg-white rounded-t-2xl px-md pt-6 pb-safe-bottom transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="pb-8">
          {/* Grab handle */}
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-300" />

          <h2 className="font-display text-h3 text-gray-900 mb-1">
            Sign in to read
          </h2>
          <p className="font-sans text-body-2 text-gray-500 mb-6">
            Your purchases are saved to your account — read on any device,
            forever.
          </p>

          {sent ? (
            <div className="rounded-lg bg-green-50 border border-green-400 px-4 py-5 text-center">
              <p className="font-display text-h4 text-gray-900 mb-1">
                Check your email
              </p>
              <p className="font-sans text-body-2 text-gray-600">
                We sent a sign-in link to{" "}
                <span className="font-bold">{email}</span>. Tap it to finish
                signing in.
              </p>
            </div>
          ) : (
            <>
              {/* Google */}
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg h-12 mb-3 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
                </svg>
                <span className="font-display text-button text-gray-900">
                  Continue with Google
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="font-mono text-caption-1 text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Email magic link */}
              <form onSubmit={handleEmail}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 font-sans text-body-2 mb-3 focus:outline-none focus:border-gray-900"
                />
                {error && (
                  <p className="font-sans text-caption-1 text-red-600 mb-2">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full h-12 rounded-lg bg-green-400 hover:bg-green-500 text-gray-900 font-display text-button transition-colors disabled:opacity-60"
                >
                  {busy ? "Sending…" : "Email me a sign-in link"}
                </button>
              </form>
            </>
          )}

          <button
            onClick={onClose}
            className="w-full mt-4 font-mono text-caption-1 text-gray-400"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSheet;
