import React, { useState, useEffect } from "react";
import { MOODS } from "../types";
import MovieDetailModal from "../components/MovieDetailModal";
import {
  getWatchlist,
  isMovieInWatchlist,
  toggleMovieWatchlist,
  WatchlistMovie,
} from "../utils/watchlist";

interface HomePageProps {
  onNavigateSearch: () => void;
  onMoodSelect: (moodId: string, moodLabel: string) => void;
  onOpenAuth: () => void;
  userEmail: string | null;
}

const VIBE_OCCASIONS = [
  { id: "popcorn", label: "🍿 Friday Popcorn Night", query: "High adrenaline blockbuster action and adventure movies" },
  { id: "datenight", label: "🕯️ Cozy Date Night", query: "Romantic heartwarming emotional films and witty rom-coms" },
  { id: "mindbending", label: "🧠 Mind-Bending Late Night", query: "Psychological thrillers with jaw-dropping plot twists" },
  { id: "quickthrill", label: "⚡ Fast 90-Min Action", query: "High paced suspense action movies under 95 minutes" },
  { id: "family", label: "👨‍👩‍👧 Family Sunday With Kids", query: "Wholesome animated family adventure films suitable for all ages" },
];

export default function HomePage({
  onNavigateSearch,
  onMoodSelect,
  onOpenAuth,
  userEmail,
}: HomePageProps) {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>(() => getWatchlist());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  // Sync with global watchlist updates
  useEffect(() => {
    const handleSync = () => setWatchlist(getWatchlist());
    window.addEventListener("cinemind_watchlist_updated", handleSync);
    return () => window.removeEventListener("cinemind_watchlist_updated", handleSync);
  }, []);

  // Hero featured item
  const heroMovie: WatchlistMovie = {
    title: "Kanguva",
    genre: "Action / Fantasy / Period Epic",
    rating: 8.6,
    year: 2024,
    duration: 154,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
    overview: "A warrior in 1678 fights to save his people. Centuries later, a bounty hunter's mission connects him back to the same perilous fate.",
    aiExplanation: "CineMind's #1 Trending Premiere: An epic historical fantasy saga featuring high-octane battle set pieces and breathtaking cinema visuals.",
    matchScore: 98,
    mediaType: "movie",
  };

  const isHeroInWatchlist = isMovieInWatchlist(heroMovie.title);

  const handleToggleHeroWatchlist = () => {
    const wasAdded = toggleMovieWatchlist(heroMovie);
    setWatchlist(getWatchlist());
    showToast(wasAdded ? `✓ Added "${heroMovie.title}" to your Watchlist!` : `Removed "${heroMovie.title}" from Watchlist`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Trending & Recommended Carousels
  const newReleases = [
    {
      id: 1,
      title: "Colony",
      year: 2024,
      badge: "TOP 10",
      rating: "8.4",
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Roadies Rebirth",
      year: 2024,
      badge: "TOP 10",
      rating: "8.1",
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Kanguva",
      year: 2024,
      badge: "NEW",
      rating: "8.6",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Main Ladega",
      year: 2024,
      badge: "HOT",
      rating: "8.3",
      poster: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      title: "Baazaar",
      year: 2023,
      badge: "",
      rating: "7.9",
      poster: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      title: "Karmakhya",
      year: 2024,
      badge: "",
      rating: "8.2",
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 7,
      title: "Hunkkaar",
      year: 2024,
      badge: "TOP 10",
      rating: "8.5",
      poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80",
    },
  ];

  const liveAndReality = [
    {
      id: 11,
      title: "BBS20: 24 HRS Live Stream",
      sub: "[Deferred] Full Uncut Feed",
      isLive: true,
      duration: "Live",
      poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 12,
      title: "BBHin Day 40: BB Says, Take a Life!",
      sub: "Episode 41 • 1h 9m",
      isLive: false,
      duration: "1h 9m",
      poster: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 13,
      title: "BBS10: 24x7 Stream House",
      sub: "Live 24x7 Stream",
      isLive: true,
      duration: "Live",
      poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 14,
      title: "BBS10: Highlights & Buzz",
      sub: "Daily Catch-Up",
      isLive: false,
      duration: "45m",
      poster: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 15,
      title: "BBS10: Elimination Night",
      sub: "24HRS Stream Room",
      isLive: true,
      duration: "Live",
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="home-dashboard">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="cinemind-floating-toast" role="status">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header / Bar */}
      <header className="home-topbar">
        <div className="topbar-left">
          <span className="platform-tag">CineMind</span>
          <span className="platform-subtag">STREAMING COMPANION</span>
        </div>

        <div className="topbar-right">
          <button className="topbar-search-chip" onClick={onNavigateSearch}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16" y2="16" />
            </svg>
            <span>Ask CineMind...</span>
          </button>

          {userEmail ? (
            <div className="user-profile-pill" onClick={onOpenAuth}>
              <div className="pill-avatar">{userEmail[0].toUpperCase()}</div>
              <span>{userEmail.split("@")[0]}</span>
            </div>
          ) : (
            <button className="btn-signin-netflix" onClick={onOpenAuth}>
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="home-scroll-container">
        {/* HERO BANNER SECTION */}
        <section className="hero-banner">
          <div
            className="hero-backdrop-img"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80)`,
            }}
          >
            <div className="hero-vignette-overlay" />
          </div>

          <div className="hero-content">
            <div className="hero-badge-row">
              <span className="badge-exclusive">EXCLUSIVE PREMIERE</span>
              <span className="badge-rating">★ {heroMovie.rating}</span>
              <span className="hero-meta-tag">{heroMovie.year}</span>
              <span className="hero-meta-tag">2h 34m</span>
            </div>

            <h1 className="hero-title">{heroMovie.title}</h1>
            <p className="hero-tagline">A Mighty Warrior. An Unforgiving Destiny.</p>
            <p className="hero-description">{heroMovie.overview}</p>

            {/* Action Buttons */}
            <div className="hero-cta-row">
              <button
                className="btn-hero-watch"
                onClick={() => setSelectedMovie(heroMovie)}
                data-focusable
                tabIndex={0}
                title="Watch Trailer & Details"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Watch Trailer</span>
              </button>

              <button
                className={`btn-hero-add ${isHeroInWatchlist ? "added" : ""}`}
                onClick={handleToggleHeroWatchlist}
                title={isHeroInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                data-focusable
                tabIndex={0}
                aria-label={isHeroInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              >
                {isHeroInWatchlist ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                )}
              </button>

              <button
                className="btn-hero-ai"
                onClick={() => setSelectedMovie(heroMovie)}
                data-focusable
                tabIndex={0}
              >
                <span>✨ AI Insights</span>
              </button>
            </div>
          </div>
        </section>

        {/* ⭐ MY WATCHLIST CAROUSEL (SHOWN WHEN USER HAS SAVED TITLES) */}
        {watchlist.length > 0 && (
          <section className="carousel-section watchlist-carousel-section">
            <div className="section-title-row">
              <div className="watchlist-title-combo">
                <h3 className="section-heading">⭐ My Watchlist</h3>
                <span className="watchlist-count-tag">{watchlist.length} Saved</span>
              </div>
            </div>

            <div className="horizontal-poster-row">
              {watchlist.map((item, idx) => (
                <div
                  key={`${item.title}-${idx}`}
                  className="portrait-card watchlist-portrait-card"
                  onClick={() => setSelectedMovie(item)}
                  data-focusable
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.title}, in watchlist`}
                >
                  <div className="watchlist-saved-chip">✓ IN LIST</div>
                  <img
                    src={
                      item.posterUrl ||
                      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80"
                    }
                    alt={item.title}
                    className="portrait-card-img"
                    loading="lazy"
                  />
                  <div className="portrait-card-overlay">
                    <h4 className="card-title">{item.title}</h4>
                    <div className="card-rating-row">
                      <span>★ {item.rating || "8.5"}</span>
                      <span>{item.year || "2024"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 1-CLICK AI LIVING ROOM OCCASIONS (VIBE NAVIGATOR) */}
        <section className="carousel-section occasions-section">
          <div className="section-title-row">
            <h3 className="section-heading">🎯 Living Room Occasions (Vibe Navigator)</h3>
            <span className="occasions-subtext">Instant curation for your viewing moment</span>
          </div>
          <div className="mood-chips-scroll">
            {VIBE_OCCASIONS.map((vibe) => (
              <button
                key={vibe.id}
                className="mood-chip-pill vibe-occasion-pill"
                onClick={() => onMoodSelect(vibe.id, vibe.query)}
                data-focusable
                tabIndex={0}
              >
                {vibe.label}
              </button>
            ))}
          </div>
        </section>

        {/* 1-CLICK MOOD CHIPS */}
        <section className="carousel-section mood-bar-section">
          <div className="section-title-row">
            <h3 className="section-heading">Curate by Your Mood (Instant AI)</h3>
          </div>
          <div className="mood-chips-scroll">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                className="mood-chip-pill"
                onClick={() => onMoodSelect(mood.id, `${mood.label} movies`)}
                data-focusable
                tabIndex={0}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </section>

        {/* CAROUSEL 1: NEW ON CINEMIND */}
        <section className="carousel-section">
          <div className="section-title-row">
            <h3 className="section-heading">New on CineMind</h3>
            <button className="view-all-link" onClick={onNavigateSearch}>
              View All &gt;
            </button>
          </div>

          <div className="horizontal-poster-row">
            {newReleases.map((item) => (
              <div
                key={item.id}
                className="portrait-card"
                onClick={() =>
                  setSelectedMovie({
                    title: item.title,
                    year: item.year,
                    rating: item.rating,
                    posterUrl: item.poster,
                    genre: "Trending Premiere",
                    overview: `Critically acclaimed title streaming now in ultra HD on Amazon Fire TV.`,
                    aiExplanation: `Top-ranked viewer favorite with strong narrative pacing and compelling performances.`,
                    matchScore: 94,
                    mediaType: "movie",
                  })
                }
                data-focusable
                tabIndex={0}
              >
                {item.badge && <div className="card-top10-badge">{item.badge}</div>}
                <img src={item.poster} alt={item.title} className="portrait-card-img" loading="lazy" />
                <div className="portrait-card-overlay">
                  <h4 className="card-title">{item.title}</h4>
                  <div className="card-rating-row">
                    <span>★ {item.rating}</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAROUSEL 2: REALITY & LIVE TV */}
        <section className="carousel-section">
          <div className="section-title-row">
            <h3 className="section-heading">Top Reality Shows & Entertainment</h3>
            <button className="view-all-link" onClick={onNavigateSearch}>
              Explore &gt;
            </button>
          </div>

          <div className="horizontal-poster-row">
            {liveAndReality.map((item) => (
              <div
                key={item.id}
                className="portrait-card"
                onClick={() =>
                  setSelectedMovie({
                    title: item.title,
                    year: 2024,
                    rating: "8.3",
                    posterUrl: item.poster,
                    genre: "Reality / Unscripted",
                    overview: `${item.sub}. Stream uncut episodes and high-voltage drama.`,
                    aiExplanation: `Popular unscripted reality television series streaming live on CineMind.`,
                    matchScore: 91,
                    mediaType: "tv",
                  })
                }
                data-focusable
                tabIndex={0}
              >
                {item.isLive && <div className="card-top10-badge badge-live">LIVE</div>}
                <img src={item.poster} alt={item.title} className="portrait-card-img" loading="lazy" />
                <div className="portrait-card-overlay">
                  <h4 className="card-title">{item.title}</h4>
                  <div className="card-rating-row">
                    <span>{item.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Interactive Movie Preview & Trailer Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isWatchlisted={selectedMovie ? isMovieInWatchlist(selectedMovie.title) : false}
        onToggleWatchlist={(m) => {
          toggleMovieWatchlist(m as WatchlistMovie);
          setWatchlist(getWatchlist());
        }}
      />
    </div>
  );
}
