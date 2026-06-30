// REPLACES your existing src/pages/TitleDetail.tsx
// Change vs. the last version: tapping Buy now goes STRAIGHT to Stripe (guest
// checkout) — no sign-in sheet first. Sign-in happens after payment, on the
// "you own it" page. Owners still see Read / Continue.

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useEntitlement } from "../lib/useEntitlement";
import { readerToProduct } from "../lib/products";

interface TitleInfo {
  id: string;
  title: string;
  cover: string;
  author: string;
  artist: string;
  summary: string;
  progress: number; // 0–100
}

const titlesData: Record<string, TitleInfo> = {
  "binary-01": {
    id: "binary-01",
    title: "BINARY #1",
    cover: "/images/cover_binary01_full.jpg",
    author: "Mark Haven Britt",
    artist: "Josef Rubín",
    summary:
      "A sci-fi thriller about identity, duplicity, and the monsters we build. When a black-ops courier discovers his cargo is alive, every choice becomes a betrayal.",
    progress: 0,
  },
};

const TitleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const title = id ? titlesData[id] : undefined;

  // Ownership state. (Hooks must run before any early return.)
  const product = id ? readerToProduct[id] : undefined;
  const { owned, loading: entLoading } = useEntitlement(product ?? "");
  const [busy, setBusy] = useState(false);

  const startCheckout = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product }),
      });
      if (!res.ok) throw new Error("checkout-failed");
      const { url } = await res.json();
      window.location.href = url; // off to Stripe
    } catch {
      setBusy(false);
      alert("Sorry — couldn't start checkout. Please try again.");
    }
  };

  if (!title) {
    return (
      <div className="px-md pt-12 pb-lg text-center">
        <p className="text-gray-500 font-mono text-caption-1">
          Title not found.
        </p>
        <Link to="/collection" className="text-green-600 underline mt-4 inline-block text-body-2">
          Back to Collection
        </Link>
      </div>
    );
  }

  const hasStarted = title.progress > 0;
  const buttonClass =
    "w-full max-w-sm bg-green-400 hover:bg-green-500 text-gray-900 font-display text-h4 text-center py-4 rounded-xl transition-colors mb-4";

  return (
    <div className="px-md pt-8 pb-lg flex flex-col items-center">
      {/* Cover — native 5:6 ratio, big */}
      <div className="w-full max-w-[300px] overflow-hidden shadow-lg mb-6">
        <img src={title.cover} alt={title.title} className="w-full h-auto" />
      </div>

      {/* Title */}
      <h1 className="font-display text-h2 text-gray-900 text-center mb-4">
        {title.title}
      </h1>

      {/* CTA Button — depends on whether the user owns this issue */}
      {entLoading ? (
        <button className={`${buttonClass} opacity-60`} disabled>
          …
        </button>
      ) : owned ? (
        <Link to={`/read/${title.id}`} className={buttonClass}>
          {hasStarted ? "Continue Issue" : "Read Issue"}
        </Link>
      ) : (
        <button
          onClick={startCheckout}
          disabled={busy}
          className={`${buttonClass} disabled:opacity-60`}
        >
          {busy ? "One sec…" : "Buy · $5"}
        </button>
      )}

      {/* Progress bar — only meaningful once they own it */}
      {owned && (
        <div className="w-full max-w-sm mb-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-700 rounded-full transition-all"
                style={{ width: `${title.progress}%` }}
              />
            </div>
            <span className="text-caption-1 text-gray-500 font-mono w-10 text-right">
              {title.progress}%
            </span>
          </div>
        </div>
      )}

      {/* Credits */}
      <div className="flex items-center gap-6 mb-4 mt-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-700" />
          <span className="font-sans text-subtitle-2 text-gray-900">
            {title.author}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span className="font-sans text-subtitle-2 text-gray-900">
            {title.artist}
          </span>
        </div>
      </div>

      {/* Summary */}
      <p className="font-mono text-body-2 text-gray-600 leading-relaxed text-center max-w-sm">
        {title.summary}
      </p>
    </div>
  );
};

export default TitleDetail;
