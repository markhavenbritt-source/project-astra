import { useState } from "react";

const previewPages = Array.from({ length: 6 }, (_, i) => i);

const summary = "BINARY is a sci-fi monster fight comic set in a post-war world of magic, industry, and mythic beasts. Part Dune, part ThunderCats. It follows two war-scarred soldiers, Omiros and Kos, drifting through the wreckage of a losing side. When Kos is struck by a mysterious illness, they hunt a cure tied to a rhino kaiju. But they're not alone. A super-enlightened octopus, is hunting it too. Their paths collide in a brutal fight for survival, meaning, and maybe redemption.";

const BinaryDetail = () => {
  const [expanded, setExpanded] = useState(false);

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

        {/* Buy now + cart button */}
        <div className="flex items-center gap-3 mb-5">
          <button className="bg-green-400 hover:bg-green-500 text-gray-900 w-12 h-12 rounded-lg transition-colors flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </button>
          <span className="font-display text-h4 text-gray-900">BUY NOW</span>
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
