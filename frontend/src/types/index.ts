export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  duration: number;
  rating: number;
  overview: string;
  posterUrl: string;
  backdropUrl?: string;
  mediaType: "movie" | "tv";
  badge?: string; // e.g. "TOP 10", "LIVE", "NEW"
  isLive?: boolean;
  category?: "entertainment" | "sports" | "news";
}

export interface Recommendation extends Movie {
  tmdbId: number;
  aiExplanation: string;
  matchScore: number;
}

export interface TrendingItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
  popularity: number;
  badge?: string;
  isLive?: boolean;
}

export interface SearchQuery {
  query: string;
  mood?: string;
  maxDuration?: number;
  language?: string;
  aiProvider: "openai" | "gemini" | "bedrock";
  category?: string;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  meta: {
    query: string;
    aiProvider: string;
    timestamp: string;
  };
}

export type AppPage = "home" | "search" | "entertainment" | "sports" | "categories" | "results";

export interface UserProfile {
  email: string;
  name: string;
  avatar: string;
}

export const MOODS = [
  { id: "feel good",    label: "😊 Feel Good",    color: "#f59e0b" },
  { id: "thriller",     label: "😱 Thriller",      color: "#ef4444" },
  { id: "comedy",       label: "😂 Comedy",        color: "#10b981" },
  { id: "romance",      label: "❤️ Romance",       color: "#ec4899" },
  { id: "action",       label: "🎬 Action",        color: "#3b82f6" },
  { id: "mind-bending", label: "🧠 Mind-bending",  color: "#8b5cf6" },
] as const;

export const LANGUAGES = [
  { code: "any", label: "Any Language" },
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "ko", label: "Korean" },
  { code: "ja", label: "Japanese" },
  { code: "de", label: "German" },
] as const;

export const DURATION_OPTIONS = [
  { label: "Any", max: undefined },
  { label: "Under 90 min", max: 90 },
  { label: "90-120 min",   max: 120 },
  { label: "2+ hours",     max: undefined, min: 120 },
] as const;
