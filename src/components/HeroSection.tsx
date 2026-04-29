import { Link } from "react-router-dom";
import { featuredComic } from "../data/comics";
import HamburgerMenu from "./HamburgerMenu";

const navIcons = [
  {
    to: "/",
    label: "Home",
    path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z",
  },
  {
    to: "/collection",
    label: "My Collection",
    path: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    to: "/search",
    label: "Search",
    path: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    to: "/cart",
    label: "Cart",
    path: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
  },
];

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop header — floats over hero, content aligned to card grid */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 z-20 pt-6 pointer-events-none">
        <div className="max-w-7xl mx-auto px-8 flex items-start justify-between">
          <Link to="/" className="flex flex-col pointer-events-auto">
            <img
              src="/images/logo_left.svg"
              alt="ASTRA"
              className="h-[50px] w-auto brightness-0 invert"
            />
            <span className="font-mono text-[14px] font-bold tracking-[0.2em] text-white mt-1">
              COMIC BOOKS / STORIES / WORLDS
            </span>
          </Link>
          <nav className="flex items-center gap-8 text-white pointer-events-auto">
            {navIcons.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-label={item.label}
                className="hover:opacity-80 transition-opacity"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-7 h-7"
                >
                  <path d={item.path} />
                </svg>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero image — links to BINARY detail */}
      <Link to="/comic/binary" className="relative block h-[480px] lg:h-[560px]">
        {/* Mobile image */}
        <img
          src="/images/hero_0318.png"
          alt="Featured comic"
          className="w-full h-full object-cover object-top lg:hidden"
        />
        {/* Desktop image */}
        <img
          src="/images/heroimage_2880_1120.png"
          alt="Featured comic"
          className="w-full h-full object-cover object-top hidden lg:block"
        />

        {/* Gradient overlay — brand yellow, extends higher on desktop to sit under headline */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 lg:h-[300px] bg-gradient-to-t from-[#FFC301]/90 to-transparent" />

        {/* Mobile hamburger */}
        <div className="lg:hidden">
          <HamburgerMenu color="text-white" />
        </div>

        {/* Mobile centered logo */}
        <div className="lg:hidden absolute top-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <img
            src="/images/logo_center.svg"
            alt="ASTRA"
            className="h-[60px] w-auto brightness-0 invert"
          />
          <span className="font-mono text-[14px] font-bold tracking-[0.2em] text-white -mt-2.5 whitespace-nowrap text-center">
            COMICS / STORIES / WORLDS
          </span>
        </div>

        {/* Featured comic info — centered on mobile, left-aligned to card grid on desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-0 lg:pb-[88px]">
          <div className="lg:max-w-7xl lg:mx-auto lg:px-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="inline-block bg-black/80 text-white text-caption-2 font-mono font-bold tracking-widest px-4 py-1 mb-1.5 rounded-full">
              {featuredComic.genre}
            </span>
            <h2
              className="font-display text-h2 text-gray-900 lg:text-[42px] lg:max-w-[802px]"
              style={{ lineHeight: "1.05" }}
            >
              {featuredComic.description}
            </h2>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default HeroSection;
