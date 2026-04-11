import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-app">
      <div className="text-center px-6">
        <h1 className="font-display text-h1 mb-4">404</h1>
        <p className="text-gray-500 font-mono text-caption-1 mb-6">Page not found</p>
        <Link
          to="/"
          className="inline-block bg-gray-900 text-white font-sans text-button font-bold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
