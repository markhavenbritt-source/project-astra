import type { Comic } from "../data/comics";

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden flex gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors border border-gray-400">
      {/* Cover image */}
      <img
        src={comic.cover}
        alt={comic.title}
        className="w-28 h-36 object-cover rounded-md flex-shrink-0"
      />

      {/* Info */}
      <div className="flex flex-col justify-center gap-2 min-w-0">
        <span className="font-mono text-caption-2 font-bold tracking-widest text-gray-900">
          {comic.genre}
        </span>
        <p className="font-sans leading-relaxed text-gray-700" style={{ fontSize: '13px' }}>
          {comic.description}
        </p>
        <span className="font-sans font-bold italic uppercase text-gray-500" style={{ fontSize: '16px' }}>
          Coming soon
        </span>
      </div>
    </div>
  );
};

export default ComicCard;
