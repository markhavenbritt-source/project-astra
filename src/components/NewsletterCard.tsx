import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const NewsletterCard = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Subscribe failed:", err);
      setStatus("error");
    }
    // Reset back to idle after a moment
    setTimeout(() => setStatus("idle"), 3000);
  };

  const placeholder =
    status === "submitting"
      ? "Sending…"
      : status === "success"
        ? "Thanks! Check your inbox."
        : status === "error"
          ? "Something went wrong. Try again."
          : "ENTER EMAIL";

  return (
    <div className="bg-white rounded-lg overflow-hidden flex gap-4 p-4 border border-green-400">
      {/* Cover image */}
      <img
        src="/images/cover_newsletter@2x.png"
        alt="Newsletter"
        className="w-28 h-36 object-cover rounded-md flex-shrink-0"
      />

      {/* Info */}
      <div className="flex flex-col justify-center gap-2 min-w-0 flex-1">
        <span className="font-mono text-caption-2 font-bold tracking-widest text-gray-900">
          NEWSLETTER
        </span>
        <p className="font-sans leading-relaxed text-gray-700" style={{ fontSize: "13px" }}>
          Join the list for early drops and behind-the-scenes looks.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-1 flex items-center gap-2 bg-white border border-gray-300 rounded-full pl-3 pr-1 py-1"
        >
          <input
            type="email"
            required
            disabled={status === "submitting"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 min-w-0 bg-transparent outline-none font-mono font-bold tracking-widest text-gray-900 placeholder:text-gray-500"
            style={{ fontSize: "10px" }}
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-label="Subscribe"
            className="flex-shrink-0 w-7 h-7 rounded-full bg-green-400 hover:bg-green-500 transition-colors flex items-center justify-center disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-gray-900"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterCard;
