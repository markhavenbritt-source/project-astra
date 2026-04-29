import HeroSection from "../components/HeroSection";
import ComicCard from "../components/ComicCard";
import NewsletterCard from "../components/NewsletterCard";
import { comics } from "../data/comics";

const Home = () => {
  const comicList = comics.filter((c) => !c.featured);

  return (
    <div>
      <HeroSection />

      {/* Comic list — stacked on mobile, 3-column grid on desktop (overlapping hero) */}
      <div className="px-md py-lg flex flex-col gap-md lg:grid lg:grid-cols-3 lg:gap-lg lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-0 lg:-mt-16 lg:mb-xl lg:relative lg:z-10">
        {comicList.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
        <NewsletterCard />
      </div>
    </div>
  );
};

export default Home;
