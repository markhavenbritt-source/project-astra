import HeroSection from "../components/HeroSection";
import ComicCard from "../components/ComicCard";
import { comics } from "../data/comics";

const Home = () => {
  const comicList = comics.filter((c) => !c.featured);

  return (
    <div>
      <HeroSection />

      {/* Comic list */}
      <div className="px-4 py-6 flex flex-col gap-4">
        {comicList.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  );
};

export default Home;
