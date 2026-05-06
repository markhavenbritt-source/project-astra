import { useRef, useState } from "react";
import html2canvas from "html2canvas";

interface FrameDef {
  label: string;
  path: string;
  filename: string;
}

const frames: FrameDef[] = [
  { label: "Home", path: "/", filename: "astra-home.png" },
  { label: "Collection", path: "/collection", filename: "astra-collection.png" },
  { label: "Search", path: "/search", filename: "astra-search.png" },
  { label: "Cart", path: "/cart", filename: "astra-cart.png" },
  { label: "Binary detail", path: "/comic/binary", filename: "astra-binary.png" },
];

const DEVICE_WIDTH = 390;
const DEVICE_HEIGHT = 844;

const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
  return new Promise<void>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      resolve();
    }, "image/png");
  });
};

const Preview = () => {
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const captureOne = async (frame: FrameDef) => {
    const iframe = iframeRefs.current[frame.path];
    const doc = iframe?.contentDocument;
    if (!iframe || !doc?.body) return;
    setBusy(frame.path);
    try {
      const canvas = await html2canvas(doc.body, {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        windowWidth: DEVICE_WIDTH,
        windowHeight: DEVICE_HEIGHT,
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      await downloadCanvas(canvas, frame.filename);
    } finally {
      setBusy(null);
    }
  };

  const captureAll = async () => {
    for (const frame of frames) {
      await captureOne(frame);
      await new Promise((r) => setTimeout(r, 400));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-6 flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Phone preview</h1>
            <p className="text-sm text-gray-500 mt-1">
              All key routes rendered at iPhone 14 width ({DEVICE_WIDTH}×{DEVICE_HEIGHT}). Click
              "Download" on any frame, or "Download all" for the full set.
            </p>
          </div>
          <button
            onClick={captureAll}
            disabled={!!busy}
            className="bg-gray-900 text-white text-sm font-mono uppercase tracking-widest px-5 py-3 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {busy ? "Capturing…" : "Download all"}
          </button>
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
              <div className="mt-3 flex items-center gap-3 text-xs">
                <button
                  onClick={() => captureOne(frame)}
                  disabled={!!busy}
                  className="bg-gray-900 text-white font-mono uppercase tracking-widest px-3 py-1.5 rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  {busy === frame.path ? "…" : "Download"}
                </button>
                <a
                  href={frame.path}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Open ↗
                </a>
              </div>
            </figure>
          ))}
        </div>

        <footer className="mt-10 text-xs text-gray-500">
          Files download to your browser's default download location (usually ~/Downloads).
        </footer>
      </div>
    </div>
  );
};

export default Preview;
