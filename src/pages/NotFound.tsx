import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-app)]">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold font-['Space_Grotesk'] mb-4">404</h1>
        <p className="text-gray-500 font-mono text-sm mb-6">Page not found</p>
        <Link
          to="/"
          className="inline-block bg-black text-white text-sm font-mono font-bold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
