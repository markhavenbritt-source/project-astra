import type { Comic } from "../data/comics";

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  return (
    <div className="bg-surface-card rounded-lg overflow-hidden flex gap-4 p-4 cursor-pointer hover:bg-surface-card-hover transition-colors">
      {/* Cover image */}
      <img
        src={comic.cover}
        alt={comic.title}
        className="w-28 h-36 object-cover rounded-md flex-shrink-0"
      />

      {/* Info */}
      <div className="flex flex-col justify-center gap-2 min-w-0">
        <span className="inline-block self-start text-caption-2 font-mono font-bold tracking-widest px-3 py-1 rounded-full border border-gray-300 bg-white">
          {comic.genre}
        </span>
        <p className="font-sans text-body-2 leading-relaxed text-gray-600">
          {comic.description}
        </p>
      </div>
    </div>
  );
};

export default ComicCard;
