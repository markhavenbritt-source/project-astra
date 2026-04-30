import { Link } from "react-router-dom";
import ComicCard from "../components/ComicCard";
import { comics } from "../data/comics";

const Search = () => {
  return (
    <div className="px-md pt-4 pb-lg">
      {/* Mobile-only top header — desktop uses the global DesktopNav in Layout */}
      <div className="lg:hidden flex items-center mb-6">
        <Link to="/" aria-label="Astra home">
          <img
            src="/images/logo_left.svg"
            alt="ASTRA"
            className="h-[28px] w-auto"
          />
        </Link>
      </div>

      <h1 className="font-sans text-h3 mb-md">Search</h1>

      {/* Search input */}
      <div className="relative mb-lg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search comics, genres, creators..."
          className="w-full bg-surface-card rounded-lg pl-10 pr-4 py-3 font-sans text-body-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50"
        />
      </div>

      {/* Genre pills */}
      <div className="flex gap-2 mb-lg overflow-x-auto no-scrollbar">
        {["All", "Sci-Fi", "Romance", "Thriller", "Crime", "Monsters"].map((genre) => (
          <button
            key={genre}
            className="flex-shrink-0 bg-white font-mono text-caption-2 font-bold tracking-widest px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {genre.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-md">
        {comics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  );
};

export default Search;
