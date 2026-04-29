const socialLinks = [
  { label: "INSTAGRAM", href: "#" },
  { label: "THREADS", href: "#" },
  { label: "BLUESKY", href: "#" },
  { label: "FACEBOOK", href: "#" },
];

const legalLinks = [
  { label: "TERMS OF USE", href: "#" },
  { label: "PRIVACY", href: "#" },
  { label: "ACCESSIBILITY", href: "#" },
  { label: "CONTACT", href: "#" },
];

const Footer = () => {
  return (
    <footer className="hidden lg:flex bg-gray-800 text-white py-4 px-8 items-center justify-between font-mono font-bold tracking-widest" style={{ fontSize: "10px" }}>
      <div className="flex gap-6">
        {socialLinks.map((item) => (
          <a key={item.label} href={item.href} className="hover:opacity-80 transition-opacity">
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-normal normal-case tracking-normal text-gray-300">copyright</span>
        <span>TWIN STAR COMICS</span>
      </div>

      <div className="flex gap-6">
        {legalLinks.map((item) => (
          <a key={item.label} href={item.href} className="hover:opacity-80 transition-opacity">
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
