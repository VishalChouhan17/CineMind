import axios from "axios";

// Cache to prevent hitting OMDb repeatedly for the same title
const posterCache = new Map<string, string>();

/**
 * Fetch high quality official movie/show poster from free open movie APIs or high-res fallbacks
 */
export async function fetchLivePoster(title: string, year?: number): Promise<string> {
  const cleanTitle = title.trim();
  if (posterCache.has(cleanTitle)) {
    return posterCache.get(cleanTitle)!;
  }

  // 1. Try free OMDb public key
  try {
    const omdbRes = await axios.get("https://www.omdbapi.com/", {
      params: {
        t: cleanTitle,
        y: year || undefined,
        apikey: "trilogy", // Standard public testing key for OMDb / free projects
      },
      timeout: 3500,
    });

    if (omdbRes.data && omdbRes.data.Poster && omdbRes.data.Poster !== "N/A" && omdbRes.data.Poster.startsWith("http")) {
      const poster = omdbRes.data.Poster;
      posterCache.set(cleanTitle, poster);
      return poster;
    }
  } catch (err) {
    // Graceful fallback if OMDb rate limited
  }

  // 2. Try Wikipedia / Wikimedia API for poster images
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
      timeout: 3500,
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
  } catch (err) {
    // Ignore Wikipedia error
  }

  // 3. High quality stylized placeholder by title hash
  const fallbackImages = [
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80"
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
