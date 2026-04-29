import { useState } from "react";

const NewsletterCard = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // MVP: just capture locally — hook to real service later
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden flex gap-4 p-4 border border-green-400">
      {/* Placeholder image */}
      <div className="w-28 h-36 bg-gray-300 rounded-md flex-shrink-0" />

      {/* Info */}
      <div className="flex flex-col justify-center gap-2 min-w-0 flex-1">
        <h3 className="font-sans font-bold text-gray-900" style={{ fontSize: "16px", lineHeight: "1.2" }}>
          Get the good stuff. Early.
        </h3>
        <p className="font-sans leading-relaxed text-gray-700" style={{ fontSize: "13px" }}>
          Join the list for early drops, behind-the-scenes looks, and the kind of stories we don't post anywhere else.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-1 flex items-center gap-2 bg-white border border-gray-300 rounded-full pl-3 pr-1 py-1"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={submitted ? "Thanks!" : "ENTER EMAIL"}
            className="flex-1 min-w-0 bg-transparent outline-none font-mono font-bold tracking-widest text-gray-900 placeholder:text-gray-500"
            style={{ fontSize: "10px" }}
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="flex-shrink-0 w-7 h-7 rounded-full bg-green-400 hover:bg-green-500 transition-colors flex items-center justify-center"
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
