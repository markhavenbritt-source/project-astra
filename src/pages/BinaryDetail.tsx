// REPLACES your existing src/pages/BinaryDetail.tsx
// Change vs. the last version: Buy goes STRAIGHT to Stripe (guest checkout),
// no sign-in sheet first. Owners see READ NOW.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEntitlement } from "../lib/useEntitlement";
import { BINARY_ISSUE_1 } from "../lib/products";

const previewPages = Array.from({ length: 6 }, (_, i) => i);

const summary = "BINARY is a sci-fi monster fight comic set in a post-war world of magic, industry, and mythic beasts. Part Dune, part ThunderCats. It follows two war-scarred soldiers, Omiros and Kos, drifting through the wreckage of a losing side. When Kos is struck by a mysterious illness, they hunt a cure tied to a rhino kaiju. But they're not alone. A super-enlightened octopus, is hunting it too. Their paths collide in a brutal fight for survival, meaning, and maybe redemption.";

const BinaryDetail = () => {
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const { owned, loading: entLoading } = useEntitlement(BINARY_ISSUE_1);

  const startCheckout = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: BINARY_ISSUE_1 }),
      });
      if (!res.ok) throw new Error("checkout-failed");
      const { url } = await res.json();
      window.location.href = url; // off to Stripe
    } catch {
      setBusy(false);
      alert("Sorry — couldn't start checkout. Please try again.");
    }
  };

  const handleClick = () => {
    if (owned) navigate("/read/binary-01");
    else startCheckout();
  };

  const label = entLoading
    ? "…"
    : owned
    ? "READ NOW"
    : busy
    ? "ONE SEC…"
    : "BUY NOW";

  return (
    <div className="min-h-screen bg-white relative">
      {/* Hero image — square, grey placeholder */}
      <div className="w-full aspect-square bg-gray-300" />

      {/* Content */}
      <div className="px-md pt-4 pb-8">
        {/* Title */}
        <h1 className="font-display text-h1 text-gray-900 mb-0.5">BINARY</h1>

        {/* Credits */}
        <p className="font-mono text-caption-1 text-gray-500 mb-2">
          by Mark Haven Britt, Steven Yu &amp; Josef Sison
        </p>

        {/* Description — truncated to ~3 lines with MORE toggle */}
        <p className="font-sans text-body-2 text-gray-700 leading-relaxed mb-3">
          {expanded ? (
            summary
          ) : (
            <>
              {summary.split(". ").slice(0, 3).join(". ")}...{" "}
              <button
                onClick={() => setExpanded(true)}
                className="font-bold text-gray-900 underline"
              >
                MORE
              </button>
            </>
          )}
        </p>

        {/* Green dashed divider */}
        <div
          className="mb-3 h-0 border-t-2 border-dashed border-green-400"
          style={{ width: "180px" }}
        />

        {/* Buy / Read button */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={handleClick}
            disabled={busy || entLoading}
            className="bg-green-400 hover:bg-green-500 text-gray-900 w-12 h-12 rounded-lg transition-colors flex items-center justify-center disabled:opacity-60"
            aria-label={label}
          >
            {owned ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 016.5 22H20v-5M4 19.5V5a2 2 0 012-2h12a2 2 0 012 2v12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            )}
          </button>
          <span className="font-display text-h4 text-gray-900">{label}</span>
          {!owned && !entLoading && (
            <span className="font-display text-h4 text-gray-400">$5</span>
          )}
        </div>

        {/* Preview pages — horizontal scroll, 2:3 ratio */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-md px-md pb-4">
          {previewPages.map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[120px] aspect-[2/3] bg-gray-300 rounded-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BinaryDetail;
