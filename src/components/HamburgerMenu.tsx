interface HamburgerMenuProps {
  color?: string;
}

const HamburgerMenu = ({ color = "text-gray-900" }: HamburgerMenuProps) => {
  return (
    <button className={`lg:hidden absolute top-4 right-4 z-10 ${color}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-7 h-7">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
};

export default HamburgerMenu;
