import { Link, useLocation } from "react-router-dom";

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

const DesktopNav = () => {
  const { pathname } = useLocation();
  // Homepage uses its own white-on-hero nav (rendered inside HeroSection)
  if (pathname === "/") return null;

  return (
    <header className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-8 flex items-start justify-between pt-6 pb-4">
        {/* Logo + tagline — same dimensions as the home-page hero nav */}
        <Link to="/" className="flex flex-col">
          <img
            src="/images/logo_left.svg"
            alt="ASTRA"
            className="h-[50px] w-auto brightness-0"
          />
          <span className="font-mono text-[14px] font-bold tracking-[0.2em] text-gray-800 mt-1">
            COMIC BOOKS / STORIES / WORLDS
          </span>
        </Link>

        {/* Icon nav */}
        <nav className="flex items-center gap-8 text-gray-800">
          {navIcons.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className="hover:opacity-70 transition-opacity"
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
    </header>
  );
};

export default DesktopNav;
