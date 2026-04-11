import HeroSection from "../components/HeroSection";
import ComicCard from "../components/ComicCard";
import { comics } from "../data/comics";

const Home = () => {
  const comicList = comics.filter((c) => !c.featured);

  return (
    <div>
      <HeroSection />

      {/* Comic list */}
      <div className="px-md py-lg flex flex-col gap-md">
        {comicList.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  );
};

export default Home;
