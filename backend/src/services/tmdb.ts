export interface TMDBMovie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  runtime?: number;
  adult: boolean;
  popularity: number;
  media_type?: string;
}

const POSTER_PRESETS: Record<string, string> = {
  space: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80",
  thriller: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
  action: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
  romance: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=500&auto=format&fit=crop&q=80",
  animation: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&auto=format&fit=crop&q=80",
  comedy: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80",
  drama: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80",
  scifi: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
  korean: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
  default: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80"
};

export function getPosterUrl(queryOrTheme: string | null): string {
  if (!queryOrTheme) return POSTER_PRESETS.default;
  if (queryOrTheme.startsWith("http")) return queryOrTheme;

  const q = queryOrTheme.toLowerCase();
  for (const [key, url] of Object.entries(POSTER_PRESETS)) {
    if (q.includes(key)) return url;
  }
  return POSTER_PRESETS.default;
}

export const CURATED_MOVIES: TMDBMovie[] = [
  {
    id: 101,
    title: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    release_date: "2010-07-16",
    poster_path: POSTER_PRESETS.scifi,
    backdrop_path: null,
    vote_average: 8.8,
    vote_count: 35000,
    genre_ids: [878, 28, 53],
    adult: false,
    popularity: 95,
    media_type: "movie",
  },
  {
    id: 102,
    title: "Interstellar",
    overview: "A team of researchers travels through a wormhole in space to ensure humanity's survival.",
    release_date: "2014-11-07",
    poster_path: POSTER_PRESETS.space,
    backdrop_path: null,
    vote_average: 8.7,
    vote_count: 32000,
    genre_ids: [878, 18, 12],
    adult: false,
    popularity: 92,
    media_type: "movie",
  },
  {
    id: 103,
    title: "The Dark Knight",
    overview: "Batman faces the Joker, an anarchic mastermind who tests his morals and limits.",
    release_date: "2008-07-18",
    poster_path: POSTER_PRESETS.action,
    backdrop_path: null,
    vote_average: 9.0,
    vote_count: 38000,
    genre_ids: [28, 80, 18],
    adult: false,
    popularity: 98,
    media_type: "movie",
  },
  {
    id: 105,
    title: "Knives Out",
    overview: "A modern Agatha Christie-style murder mystery with an eccentric detective.",
    release_date: "2019-11-27",
    poster_path: POSTER_PRESETS.thriller,
    backdrop_path: null,
    vote_average: 7.9,
    vote_count: 12000,
    genre_ids: [35, 80, 9648, 53],
    adult: false,
    popularity: 84,
    media_type: "movie",
  },
  {
    id: 108,
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.",
    release_date: "2024-03-01",
    poster_path: POSTER_PRESETS.scifi,
    backdrop_path: null,
    vote_average: 8.6,
    vote_count: 18000,
    genre_ids: [878, 12],
    adult: false,
    popularity: 96,
    media_type: "movie",
  },
  {
    id: 109,
    title: "Coco",
    overview: "Young Miguel enters the vibrant Land of the Dead to discover his family's history.",
    release_date: "2017-10-27",
    poster_path: POSTER_PRESETS.animation,
    backdrop_path: null,
    vote_average: 8.2,
    vote_count: 17000,
    genre_ids: [16, 10751, 14],
    adult: false,
    popularity: 87,
    media_type: "movie",
  }
];

export async function searchMedia(_query: string): Promise<TMDBMovie[]> {
  return CURATED_MOVIES;
}

export async function discoverMovies(_filters: any): Promise<TMDBMovie[]> {
  return CURATED_MOVIES;
}

export async function getTrending(): Promise<TMDBMovie[]> {
  return CURATED_MOVIES;
}

export function moodToGenreIds(_mood: string): number[] {
  return [];
}