import axios from "axios";

// Cache to prevent hitting APIs repeatedly for the same title
const posterCache = new Map<string, string>();

// Multiple free/testing keys for OMDb to guarantee high availability
const OMDB_KEYS = ["trilogy", "b735232d", "924f3316", "2b1464ec"];

/**
 * Fetch high quality official movie/show poster from open movie APIs or high-res fallbacks
 */
export async function fetchLivePoster(title: string, year?: number): Promise<string> {
  const cleanTitle = title.trim();
  if (posterCache.has(cleanTitle)) {
    return posterCache.get(cleanTitle)!;
  }

  // 1. Try OMDb API with key rotation
  for (const key of OMDB_KEYS) {
    try {
      const omdbRes = await axios.get("https://www.omdbapi.com/", {
        params: {
          t: cleanTitle,
          y: year || undefined,
          apikey: key,
        },
        timeout: 3000,
      });

      if (
        omdbRes.data &&
        omdbRes.data.Poster &&
        omdbRes.data.Poster !== "N/A" &&
        omdbRes.data.Poster.startsWith("http")
      ) {
        const poster = omdbRes.data.Poster;
        posterCache.set(cleanTitle, poster);
        return poster;
      }
    } catch {
      // Try next key
    }
  }

  // 2. Try TVMaze API (100% free, no key needed, excellent for TV series & anime)
  try {
    const tvmazeRes = await axios.get("https://api.tvmaze.com/singlesearch/shows", {
      params: { q: cleanTitle },
      timeout: 2500,
    });
    if (tvmazeRes.data?.image?.original) {
      const poster = tvmazeRes.data.image.original;
      posterCache.set(cleanTitle, poster);
      return poster;
    }
  } catch {
    // Ignore
  }

  // 3. Try Wikipedia / Wikimedia Page Images API
  try {
    const wikiRes = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        format: "json",
        prop: "pageimages",
        piprop: "original",
        titles: `${cleanTitle} (film)|${cleanTitle} (TV series)|${cleanTitle}`,
      },
      headers: { "User-Agent": "CineMindFireTV/1.0 (academic; hackathon)" },
      timeout: 2500,
    });

    const pages = wikiRes.data?.query?.pages;
    if (pages) {
      for (const pageId in pages) {
        const page = pages[pageId];
        if (page?.original?.source) {
          const poster = page.original.source;
          posterCache.set(cleanTitle, poster);
          return poster;
        }
      }
    }
  } catch {
    // Ignore
  }

  // 4. Curated cinematic high-resolution poster fallbacks (Cinema aesthetics)
  const fallbackImages = [
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
  ];

  let hash = 0;
  for (let i = 0; i < cleanTitle.length; i++) {
    hash = (hash << 5) - hash + cleanTitle.charCodeAt(i);
    hash |= 0;
  }
  const chosen = fallbackImages[Math.abs(hash) % fallbackImages.length];
  posterCache.set(cleanTitle, chosen);
  return chosen;
}
