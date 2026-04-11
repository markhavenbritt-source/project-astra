import { featuredComic } from "../data/comics";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero image */}
      <div className="relative h-[480px]">
        <img
          src="/images/hero_0318.png"
          alt="Featured comic"
          className="w-full h-full object-cover object-top"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hamburger menu */}
        <button className="absolute top-7 left-4 text-white z-10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-8 h-8">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Astra Logo + Subhead */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <img
            src="/images/logo_center.svg"
            alt="ASTRA"
            className="h-[60px] w-auto brightness-0 invert"
          />
          <span className="font-mono text-[14px] font-bold tracking-[0.2em] text-white -mt-2.5 whitespace-nowrap text-center">
            COMICS / STORIES / WORLDS
          </span>
        </div>

        {/* Featured comic info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="inline-block bg-black/80 text-white text-caption-2 font-mono font-bold tracking-widest px-3 py-1.5 mb-3">
            {featuredComic.genre}
          </span>
          <h2 className="font-display text-h2 leading-tight text-white">
            {featuredComic.description}
          </h2>
        </div>
      </div>

      {/* Yellow accent bar — brand yellow */}
      <div className="h-2 bg-yellow-500" />
    </section>
  );
};

export default HeroSection;
