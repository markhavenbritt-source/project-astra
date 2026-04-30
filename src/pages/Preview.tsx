import { useRef } from "react";

interface FrameDef {
  label: string;
  path: string;
}

const frames: FrameDef[] = [
  { label: "Home", path: "/" },
  { label: "Collection", path: "/collection" },
  { label: "Search", path: "/search" },
  { label: "Cart", path: "/cart" },
  { label: "Binary detail", path: "/comic/binary" },
];

const DEVICE_WIDTH = 390;
const DEVICE_HEIGHT = 844;

const Preview = () => {
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Phone preview</h1>
          <p className="text-sm text-gray-500 mt-1">
            All key routes rendered at iPhone 14 width ({DEVICE_WIDTH}×{DEVICE_HEIGHT}). Use your OS
            screenshot tool ({navigator.platform.includes("Mac") ? "Cmd+Shift+4" : "PrtScn"}) on any
            frame, or drag-select the frame.
          </p>
        </header>

        <div className="flex gap-6 overflow-x-auto pb-6">
          {frames.map((frame) => (
            <figure
              key={frame.path}
              className="flex flex-col items-center flex-shrink-0"
            >
              <figcaption className="font-mono text-xs uppercase tracking-widest text-gray-700 mb-2">
                {frame.label}
                <span className="ml-2 text-gray-400 normal-case tracking-normal">
                  {frame.path}
                </span>
              </figcaption>
              <div
                className="bg-white rounded-[36px] shadow-lg overflow-hidden border-[10px] border-gray-900"
                style={{ width: DEVICE_WIDTH + 20, height: DEVICE_HEIGHT + 20 }}
              >
                <iframe
                  ref={(el) => {
                    iframeRefs.current[frame.path] = el;
                  }}
                  title={frame.label}
                  src={frame.path}
                  width={DEVICE_WIDTH}
                  height={DEVICE_HEIGHT}
                  style={{
                    width: DEVICE_WIDTH,
                    height: DEVICE_HEIGHT,
                    border: "none",
                    display: "block",
                  }}
                />
              </div>
              <a
                href={frame.path}
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-xs text-blue-600 hover:underline"
              >
                Open standalone ↗
              </a>
            </figure>
          ))}
        </div>

        <footer className="mt-10 text-xs text-gray-500">
          Tip: in Chrome DevTools, press{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-200 rounded">Cmd+Shift+M</kbd> to toggle device mode
          and pick "iPhone 14" for an interactive emulator with built-in screenshot capture (3-dot
          menu → Capture screenshot).
        </footer>
      </div>
    </div>
  );
};

export default Preview;
