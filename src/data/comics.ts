export interface Comic {
  id: string;
  title: string;
  genre: string;
  description: string;
  cover: string;
  featured?: boolean;
}

export const comics: Comic[] = [
  {
    id: "monsters-01",
    title: "Kaiju Rising",
    genre: "SCI-FI / MONSTER FIGHT",
    description:
      "In the ashes of a fallen world, soldiers, monsters fight for survival.",
    cover: "/images/cover_mon01.png",
    featured: true,
  },
  {
    id: "full-color-01",
    title: "Full Color",
    genre: "ROMANCE",
    description:
      "In the ashes of a fallen world, soldiers, monsters fight for survival.",
    cover: "/images/cover_FC01.png",
  },
  {
    id: "binary-01",
    title: "Binary",
    genre: "THRILLER",
    description:
      "A lifetime of dealing with Napoleonic bosses has pushed Boom over the edge. FULL COLOR is a high-octane New York odyssey.",
    cover: "/images/cover_bin01.png",
  },
  {
    id: "monsters-02",
    title: "Deep Ones",
    genre: "CRIME",
    description:
      "A small town murder in the 90s cracks open every secret. The real danger isn't the killer, it's the truth no one wants exposed.",
    cover: "/images/cover_mon02.png",
  },
  {
    id: "monsters-03",
    title: "Tide Breaker",
    genre: "MONSTERS",
    description:
      "A sci-fi monster fight comic set in a post-war world filled with magic, industrial change, and mythic creatures.",
    cover: "/images/cover_mon01.png",
  },
];

export const featuredComic = comics.find((c) => c.featured) || comics[0];
