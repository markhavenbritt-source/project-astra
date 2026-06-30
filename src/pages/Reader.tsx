// REPLACES your existing src/pages/Reader.tsx
// Change: the reader is now GATED. Before showing pages it checks that the
// signed-in user actually owns this issue. If they don't (or aren't signed
// in), they're bounced to the BINARY detail page instead of seeing the comic.
// Everything about the reading experience itself is unchanged.

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useEntitlement } from "../lib/useEntitlement";
import { readerToProduct } from "../lib/products";

/**
 * Page manifest per title.
 * Each entry is a path under /images that Vite serves from public/.
 */
const pageManifest: Record<string, string[]> = {
  "binary-01": Array.from({ length: 39 }, (_, i) => {
    const suffix = i === 0 ? "" : String(i + 1);
    return `/images/BINARY_phone/BINARY01_phoneA${suffix}.png`;
  }),
};

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pages = id ? pageManifest[id] : undefined;

  // Which product must the user own to read this id?
  const product = id ? readerToProduct[id] : undefined;
  const { owned, loading: accessLoading } = useEntitlement(product ?? "");

  const [showUI, setShowUI] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const totalPages = pages?.length ?? 0;
  const progress = totalPages > 0 ? Math.round(((currentPage + 1) / totalPages) * 100) : 0;

  // Access guard: if the check is done and they don't own it, send them
  // to the detail page (where they can sign in / buy).
  useEffect(() => {
    if (!product) return;
    if (!accessLoading && !owned) {
      navigate("/comic/binary", { replace: true });
    }
  }, [accessLoading, owned, product, navigate]);

  // Track which page is in view
  useEffect(() => {
    if (!pages || !owned) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-page-index"));
            if (!isNaN(index)) setCurrentPage(index);
          }
        }
      },
      { threshold: 0.5 }
    );

    pageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pages, owned]);

  // Auto-hide UI after scroll
  const handleScroll = useCallback(() => {
    setShowUI(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowUI(false), 2000);
  }, []);

  // Tap to toggle UI
  const handleTap = useCallback(() => {
    setShowUI((prev) => !prev);
  }, []);

  if (!pages || !product) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="font-mono text-caption-1">Comic not found.</p>
      </div>
    );
  }

  // While we check ownership (or if not owned and about to redirect), show a
  // simple black loading screen rather than flashing the comic.
  if (accessLoading || !owned) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="font-mono text-caption-1 animate-pulse">Loading…</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-safe-top h-14 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className="text-white p-2 -ml-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white font-mono text-caption-1">
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* Bottom progress bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 pb-safe-bottom transition-opacity duration-300 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-green-400 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scrollable pages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar"
        onScroll={handleScroll}
        onClick={handleTap}
      >
        {pages.map((src, i) => (
          <div
            key={i}
            ref={(el) => { pageRefs.current[i] = el; }}
            data-page-index={i}
            className="w-full"
          >
            <img
              src={src}
              alt={`Page ${i + 1}`}
              className="w-full h-auto block"
              loading={i < 5 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* End of issue */}
        <div className="flex flex-col items-center justify-center py-16 bg-black text-white text-center">
          <p className="font-mono text-caption-1 text-gray-400 mb-4">
            End of Issue
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-400 text-gray-900 font-display text-button px-8 py-3 rounded-lg"
          >
            Back to Title
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reader;
