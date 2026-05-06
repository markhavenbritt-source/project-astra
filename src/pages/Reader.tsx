import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ============================================================
// Manifests
// ============================================================

/**
 * Mobile manifest — vertical-scroll reader (existing).
 * Each entry is a path under /images that Vite serves from public/.
 */
const mobilePageManifest: Record<string, string[]> = {
  "binary-01": Array.from({ length: 39 }, (_, i) => {
    const suffix = i === 0 ? "" : String(i + 1);
    return `/images/BINARY_phone/BINARY01_phoneA${suffix}.png`;
  }),
};

/**
 * Desktop manifest — paged spread reader.
 * Each entry is one "view": either a single page (cover, splash, last page)
 * or a spread of two pages (left + right) shown side-by-side.
 *
 * BINARY 01 sequence (11 views):
 *   cover → (2,3) → (4,5) → (6,7) → (8,9) → (10,11)
 *         → (12,13) → (14,15) → (16,17) → (18,19) → LAST
 */
type DesktopView =
  | { kind: "single"; src: string }
  | { kind: "spread"; left: string; right: string };

const D = "/images/BINARY_desktop";
const desktopViewManifest: Record<string, DesktopView[]> = {
  "binary-01": [
    { kind: "single", src: `${D}/binary01_cover.jpg` },
    { kind: "spread", left: `${D}/binary01_tablet2.jpg`,  right: `${D}/binary01_tablet3.jpg` },
    { kind: "spread", left: `${D}/binary01_tablet4.jpg`,  right: `${D}/binary01_tablet5.jpg` },
    { kind: "spread", left: `${D}/binary01_tablet6.jpg`,  right: `${D}/binary01_tablet7.jpg` },
    { kind: "spread", left: `${D}/binary01_tablet8.jpg`,  right: `${D}/binary01_tablet9.jpg` },
    { kind: "spread", left: `${D}/binary01_tablet10.jpg`, right: `${D}/binary01_tablet11.jpg` },
    { kind: "spread", left: `${D}/binary01_tablet12.jpg`, right: `${D}/binary01_tablet13.jpg` },
    { kind: "spread", left: `${D}/binary01_tablet14.jpg`, right: `${D}/binary01_tablet15.jpg` },
    { kind: "spread", left: `${D}/binary01_tablet16.jpg`, right: `${D}/binary01_tablet17.jpg` },
    { kind: "spread", left: `${D}/binary01_tablet18.jpg`, right: `${D}/binary01_tablet19.jpg` },
    { kind: "single", src: `${D}/binary01_LAST.png` },
  ],
};

// ============================================================
// Viewport detection — auto-pick mobile vs desktop reader
// ============================================================

const DESKTOP_QUERY = "(min-width: 1024px)";

const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(DESKTOP_QUERY).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
};

// ============================================================
// MobileReader — vertical scroll, IntersectionObserver, tap to toggle UI
// (Existing behavior preserved verbatim.)
// ============================================================

const MobileReader = ({ pages, onExit }: { pages: string[]; onExit: () => void }) => {
  const [showUI, setShowUI] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const totalPages = pages.length;
  const progress = totalPages > 0 ? Math.round(((currentPage + 1) / totalPages) * 100) : 0;

  // Track which page is in view
  useEffect(() => {
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
  }, [pages]);

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

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-safe-top h-14 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button onClick={onExit} className="text-white p-2 -ml-2">
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
          <p className="font-mono text-caption-1 text-gray-400 mb-4">End of Issue</p>
          <button
            onClick={onExit}
            className="bg-green-400 text-gray-900 font-display text-button px-8 py-3 rounded-lg"
          >
            Back to Title
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// DesktopReader — paged spread, left/right navigation
// ============================================================

const DesktopReader = ({ views, onExit }: { views: DesktopView[]; onExit: () => void }) => {
  const [currentView, setCurrentView] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const totalViews = views.length;
  const progress = Math.round(((currentView + 1) / totalViews) * 100);
  const atFirst = currentView === 0;
  const atLast = currentView === totalViews - 1;

  const goNext = useCallback(() => {
    setCurrentView((v) => (v >= totalViews - 1 ? v : v + 1));
  }, [totalViews]);

  const goPrev = useCallback(() => {
    setCurrentView((v) => (v <= 0 ? v : v - 1));
  }, []);

  // Auto-hide UI after 2s of inactivity
  const bumpUI = useCallback(() => {
    setShowUI(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowUI(false), 2000);
  }, []);

  useEffect(() => {
    bumpUI();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [bumpUI, currentView]);

  // Keyboard: arrows / space advance, Esc exits
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape") {
        onExit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onExit]);

  // Smart preload: current view + previous + next.
  // The browser loads <img> elements eagerly even when hidden via display:none,
  // so this primes the cache for instant transitions.
  const preloadSrcs = useMemo(() => {
    const collect = (v: DesktopView) =>
      v.kind === "single" ? [v.src] : [v.left, v.right];
    const indexes = [currentView - 1, currentView, currentView + 1].filter(
      (i) => i >= 0 && i < totalViews
    );
    return indexes.flatMap((i) => collect(views[i]));
  }, [views, currentView, totalViews]);

  const view = views[currentView];

  return (
    <div
      className="fixed inset-0 bg-black z-[100] flex flex-col select-none overflow-hidden"
      onMouseMove={bumpUI}
    >
      {/* Hidden preload */}
      <div className="hidden">
        {preloadSrcs.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 h-14 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={onExit}
          className="text-white p-2 -ml-2 flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-mono text-caption-1">Back</span>
        </button>
        <span className="text-white font-mono text-caption-1">
          View {currentView + 1} / {totalViews}
        </span>
      </div>

      {/* Page content area */}
      <div className="flex-1 flex items-center justify-center relative px-16 py-8">
        {/* Crossfade keyed on view index — remounting the wrapper triggers .reader-fade */}
        <div
          key={currentView}
          className="reader-fade flex items-stretch justify-center max-h-full max-w-full"
        >
          {view.kind === "single" ? (
            <img
              src={view.src}
              alt={`View ${currentView + 1}`}
              className="block max-h-[calc(100vh-6rem)] max-w-full w-auto h-auto object-contain"
              draggable={false}
            />
          ) : (
            <>
              <img
                src={view.left}
                alt={`View ${currentView + 1} left`}
                className="block max-h-[calc(100vh-6rem)] max-w-[50%] w-auto h-auto object-contain"
                draggable={false}
              />
              <img
                src={view.right}
                alt={`View ${currentView + 1} right`}
                className="block max-h-[calc(100vh-6rem)] max-w-[50%] w-auto h-auto object-contain"
                draggable={false}
              />
            </>
          )}
        </div>

        {/* Left edge hot-zone — click anywhere on the left third to go back */}
        <button
          aria-label="Previous view"
          onClick={goPrev}
          disabled={atFirst}
          className={`absolute left-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-start pl-6 group ${
            atFirst ? "cursor-default" : "cursor-pointer"
          }`}
        >
          <span
            className={`flex items-center justify-center w-12 h-12 rounded-full bg-black/40 text-white border border-white/20 transition-all duration-200 ${
              atFirst
                ? "opacity-0"
                : showUI
                  ? "opacity-90 group-hover:opacity-100 group-hover:bg-black/70 group-hover:scale-110"
                  : "opacity-0 group-hover:opacity-90"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        </button>

        {/* Right edge hot-zone — click anywhere on the right third to go forward */}
        <button
          aria-label="Next view"
          onClick={goNext}
          disabled={atLast}
          className={`absolute right-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-end pr-6 group ${
            atLast ? "cursor-default" : "cursor-pointer"
          }`}
        >
          <span
            className={`flex items-center justify-center w-12 h-12 rounded-full bg-black/40 text-white border border-white/20 transition-all duration-200 ${
              atLast
                ? "opacity-0"
                : showUI
                  ? "opacity-90 group-hover:opacity-100 group-hover:bg-black/70 group-hover:scale-110"
                  : "opacity-0 group-hover:opacity-90"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Bottom progress bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-300 ${
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

      {/* End-of-issue overlay on the last view */}
      {atLast && (
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ${
            showUI ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={onExit}
            className="bg-green-400 text-gray-900 font-display text-button px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Title
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================
// Reader root — auto-detects viewport, renders one or the other
// ============================================================

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const mobilePages = id ? mobilePageManifest[id] : undefined;
  const desktopViews = id ? desktopViewManifest[id] : undefined;

  if (!mobilePages || !desktopViews) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="font-mono text-caption-1">Comic not found.</p>
      </div>
    );
  }

  const onExit = () => navigate(-1);

  return isDesktop
    ? <DesktopReader views={desktopViews} onExit={onExit} />
    : <MobileReader pages={mobilePages} onExit={onExit} />;
};

export default Reader;
