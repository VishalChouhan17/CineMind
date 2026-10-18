export interface WatchlistMovie {
  title: string;
  year?: number | string;
  genre?: string;
  rating?: number | string;
  duration?: number | string;
  posterUrl?: string;
  overview?: string;
  aiExplanation?: string;
  matchScore?: number;
  mediaType?: "movie" | "tv";
}

const STORAGE_KEY = "cinemind_watchlist_items";

export function getWatchlist(): WatchlistMovie[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    // Handle both string arrays and object arrays
    return parsed.map((item) => {
      if (typeof item === "string") {
        return {
          title: item,
          year: 2024,
          rating: 8.5,
          posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
        };
      }
      return item;
    });
  } catch (err) {
    console.error("Failed to read watchlist:", err);
    return [];
  }
}

export function isMovieInWatchlist(title: string): boolean {
  if (!title) return false;
  const list = getWatchlist();
  const cleanTarget = title.trim().toLowerCase();
  return list.some((m) => m.title.trim().toLowerCase() === cleanTarget);
}

export function toggleMovieWatchlist(movie: WatchlistMovie): boolean {
  if (!movie || !movie.title) return false;
  const list = getWatchlist();
  const cleanTarget = movie.title.trim().toLowerCase();
  const existingIndex = list.findIndex((m) => m.title.trim().toLowerCase() === cleanTarget);

  let updatedList: WatchlistMovie[];
  let isNowAdded: boolean;

  if (existingIndex >= 0) {
    updatedList = list.filter((_, idx) => idx !== existingIndex);
    isNowAdded = false;
  } else {
    updatedList = [movie, ...list];
    isNowAdded = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    // Also keep legacy string array updated for backwards compatibility
    localStorage.setItem("cinemind_watchlist", JSON.stringify(updatedList.map((m) => m.title)));
    window.dispatchEvent(new CustomEvent("cinemind_watchlist_updated"));
  } catch (err) {
    console.error("Failed to save watchlist:", err);
  }

  return isNowAdded;
}
