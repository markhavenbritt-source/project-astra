// The "you own it now" page. Stripe sends buyers here after payment (/owned).
// They paid as a guest, so now they sign in — with the SAME email they paid
// with, or Google — to start reading and bind it to their account forever.
// We wait briefly for the webhook to record ownership, then drop into the reader.

import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider";
import { useEntitlement } from "../lib/useEntitlement";
import { BINARY_ISSUE_1 } from "../lib/products";

const PurchaseSuccess = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, signInWithEmail } = useAuth();
  const { owned, refresh } = useEntitlement(BINARY_ISSUE_1);

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Once signed in: poll a few times for the webhook to record ownership,
  // then go straight into the reader.
  useEffect(() => {
    if (!user) return;
    if (owned) {
      navigate("/read/binary-01", { replace: true });
      return;
    }
    const poll = setInterval(() => refresh(), 2000);
    const stop = setTimeout(() => clearInterval(poll), 15000);
    return () => {
      clearInterval(poll);
      clearTimeout(stop);
    };
  }, [user, owned, navigate, refresh]);

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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-md text-center">
      <div className="max-w-sm w-full">
        <div className="font-mono text-caption-1 text-green-600 mb-2">
          PAYMENT COMPLETE
        </div>
        <h1 className="font-display text-h2 text-gray-900 mb-2">
          You own BINARY #1
        </h1>

        {user ? (
          <p className="font-sans text-body-2 text-gray-500 animate-pulse">
            Unlocking your comic… hang tight.
          </p>
        ) : sent ? (
          <div className="rounded-lg bg-green-50 border border-green-400 px-4 py-5 mt-4">
            <p className="font-display text-h4 text-gray-900 mb-1">
              Check your email
            </p>
            <p className="font-sans text-body-2 text-gray-600">
              We sent a sign-in link to <span className="font-bold">{email}</span>.
              Tap it to start reading.
            </p>
          </div>
        ) : (
          <>
            <p className="font-sans text-body-2 text-gray-500 mb-6">
              Sign in to start reading — use the same email you paid with, on any
              device, forever.
            </p>

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

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="font-mono text-caption-1 text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

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
      </div>
    </div>
  );
};

export default PurchaseSuccess;
