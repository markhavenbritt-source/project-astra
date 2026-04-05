import ComicCard from "../components/ComicCard";
import { comics } from "../data/comics";

const Search = () => {
  return (
    <div className="px-4 pt-12 pb-6">
      <h1 className="text-2xl font-bold font-['Space_Grotesk'] mb-4">Search</h1>

      {/* Search input */}
      <div className="relative mb-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search comics, genres, creators..."
          className="w-full bg-[var(--bg-card)] rounded-lg pl-10 pr-4 py-3 text-sm font-mono placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:ring-opacity-50"
        />
      </div>

      {/* Genre pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {["All", "Sci-Fi", "Romance", "Thriller", "Crime", "Monsters"].map((genre) => (
          <button
            key={genre}
            className="flex-shrink-0 bg-white text-[11px] font-bold tracking-widest px-4 py-2 rounded-full border border-gray-300 font-mono hover:bg-gray-100 transition-colors"
          >
            {genre.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4">
        {comics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  );
};

export default Search;
