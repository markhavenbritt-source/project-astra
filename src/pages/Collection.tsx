import { Link } from "react-router-dom";

interface CollectionTitle {
  id: string;
  name: string;
  covers: { id: string; src: string; linkTo?: string }[];
}

const titles: CollectionTitle[] = [
  {
    id: "binary",
    name: "BINARY",
    covers: [
      { id: "binary-01", src: "/images/2x3_cover_binary01@2x.png", linkTo: "/title/binary-01" },
      { id: "binary-02", src: "" },
      { id: "binary-03", src: "" },
      { id: "binary-04", src: "" },
    ],
  },
  {
    id: "full-color",
    name: "FULL COLOR",
    covers: [
      { id: "fc-01", src: "" },
      { id: "fc-02", src: "" },
      { id: "fc-03", src: "" },
      { id: "fc-04", src: "" },
    ],
  },
  {
    id: "monument",
    name: "MONUMENT",
    covers: [
      { id: "mon-01", src: "" },
      { id: "mon-02", src: "" },
      { id: "mon-03", src: "" },
      { id: "mon-04", src: "" },
    ],
  },
];

const Collection = () => {
  return (
    <div className="pt-4 pb-lg">
      {/* Mobile-only top header — desktop uses the global DesktopNav in Layout */}
      <div className="lg:hidden flex items-center px-md mb-6">
        <Link to="/" aria-label="Astra home">
          <img
            src="/images/logo_left.svg"
            alt="ASTRA"
            className="h-[28px] w-auto"
          />
        </Link>
      </div>

      {/* Title sections */}
      {titles.map((title) => (
        <section key={title.id} className="mb-8">
          {/* Section heading with green dashed underline */}
          <div className="px-md mb-4">
            <h2 className="font-condensed text-h4 font-bold text-gray-900 tracking-wide">
              {title.name}
            </h2>
            <div
              className="mt-1 h-0 border-t-2 border-dashed border-green-400"
              style={{ width: "120px" }}
            />
          </div>

          {/* Horizontal scrolling covers */}
          <div className="flex gap-3 px-md overflow-x-auto no-scrollbar">
            {title.covers.map((cover) => {
              const inner = (
                <div
                  className="flex-shrink-0 w-[130px] aspect-[2/3] rounded-md overflow-hidden bg-gray-200"
                >
                  {cover.src ? (
                    <img
                      src={cover.src}
                      alt={cover.id}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
              );

              return cover.linkTo ? (
                <Link key={cover.id} to={cover.linkTo}>
                  {inner}
                </Link>
              ) : (
                <div key={cover.id}>{inner}</div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Collection;
