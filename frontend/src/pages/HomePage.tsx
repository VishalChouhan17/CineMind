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

  // Hero featured item (Authentic movie data)
  const heroMovie: WatchlistMovie = {
    title: "Kanguva",
    genre: "Action / Fantasy / Period Epic",
    rating: 8.6,
    year: 2024,
    duration: 154,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
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

  // Trending & Recommended Carousels with Authentic Cinema Data
  const newReleases = [
    {
      id: 1,
      title: "Dune: Part Two",
      year: 2024,
      badge: "TOP 1",
      rating: "8.5",
      genre: "Sci-Fi / Adventure",
      duration: "2h 46m",
      overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Winner of 6 Academy Awards: Denis Villeneuve's grand sci-fi spectacle with world-class IMAX visuals.",
    },
    {
      id: 2,
      title: "Oppenheimer",
      year: 2023,
      badge: "OSCAR",
      rating: "8.9",
      genre: "Biography / Drama",
      duration: "3h 0m",
      overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
      poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Christopher Nolan's biographical masterpiece featuring Cillian Murphy's career-defining performance.",
    },
    {
      id: 3,
      title: "Kanguva",
      year: 2024,
      badge: "NEW",
      rating: "8.6",
      genre: "Action / Period Epic",
      duration: "2h 34m",
      overview: "A warrior in 1678 fights to save his people. Centuries later, a bounty hunter's mission connects him back to the same perilous fate.",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "High-octane South Asian epic fantasy with dual-timeline action and thunderous tribal battle choreography.",
    },
    {
      id: 4,
      title: "Deadpool & Wolverine",
      year: 2024,
      badge: "HOT",
      rating: "7.8",
      genre: "Action / Comedy / Sci-Fi",
      duration: "2h 8m",
      overview: "Wade Wilson's peaceful life is shattered when the Time Variance Authority recruits him for a multiverse mission with Wolverine.",
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "The ultimate superhero buddy comedy packed with fourth-wall breaks, adrenaline, and nostalgic cameos.",
    },
    {
      id: 5,
      title: "Spider-Man: Across the Spider-Verse",
      year: 2023,
      badge: "TOP 10",
      rating: "8.7",
      genre: "Animation / Action",
      duration: "2h 20m",
      overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
      poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Groundbreaking animation art style and an emotional coming-of-age journey across dimensions.",
    },
    {
      id: 6,
      title: "The Batman",
      year: 2022,
      badge: "CRITIC",
      rating: "7.8",
      genre: "Crime / Mystery / Drama",
      duration: "2h 56m",
      overview: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Atmospheric, rain-drenched detective noir that brings the Caped Crusader back to gritty investigation roots.",
    },
    {
      id: 7,
      title: "Interstellar",
      year: 2014,
      badge: "ICONIC",
      rating: "8.7",
      genre: "Sci-Fi / Adventure",
      duration: "2h 49m",
      overview: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft along with a team of researchers.",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Christopher Nolan's emotionally shattering exploration of love, physics, wormholes, and human survival.",
    },
  ];

  const liveAndReality = [
    {
      id: 11,
      title: "Formula 1: Drive to Survive",
      sub: "Season 6 • High Octane",
      isLive: false,
      duration: "45m",
      rating: "8.5",
      genre: "Sports Docuseries",
      overview: "Drivers, managers and team owners live life in the fast lane — both on and off the track during each cutthroat season of Formula 1 racing.",
      poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Unmatched inside access into the high-stakes rivalries and billion-dollar drama of global motorsport.",
    },
    {
      id: 12,
      title: "Planet Earth III",
      sub: "BBC Earth • Sir David Attenborough",
      isLive: false,
      duration: "55m",
      rating: "9.3",
      genre: "Nature / Documentary",
      overview: "Journey to the far corners of the planet to discover the most astonishing animal behaviors and landscapes on Earth.",
      poster: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Visually awe-inspiring natural history series captured in pristine 4K HDR across seven continents.",
    },
    {
      id: 13,
      title: "F1 Grand Prix: Live Race Day",
      sub: "Live 4K Ultra HD Broadcast",
      isLive: true,
      duration: "Live",
      rating: "9.0",
      genre: "Live Sports",
      overview: "Live high-speed championship action, pit stop strategies, and telemetry commentary from the Formula 1 World Championship.",
      poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Live streaming with multiple camera angles and cockpit team radio feeds.",
    },
    {
      id: 14,
      title: "The Last Dance",
      sub: "Michael Jordan & Chicago Bulls",
      isLive: false,
      duration: "50m",
      rating: "9.1",
      genre: "Sports / Biography",
      overview: "Charting the rise of the 1990s Chicago Bulls, led by Michael Jordan, one of the most notable dynasties in sports history.",
      poster: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Compelling sports history featuring never-before-seen footage of Michael Jordan's final championship season.",
    },
    {
      id: 15,
      title: "Chef's Table",
      sub: "Culinary Masters Worldwide",
      isLive: false,
      duration: "48m",
      rating: "8.5",
      genre: "Culinary / Documentary",
      overview: "Profiles of some of the most renowned international chefs who are sharing their personal stories, inspirations, and unique styles.",
      poster: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
      aiExplanation: "Intimate and cinematographically gorgeous profile of culinary artistry redefining gastronomy.",
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

      {/* Top Header / Bar — Official Amazon Fire TV & Prime Navigation Ribbon */}
      <header className="home-topbar amazon-firetv-header">
        <div className="topbar-left">
          <div className="firetv-brand-combo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="firetv-tag">fire<span className="firetv-accent">tv</span></span>
            <span className="firetv-divider">|</span>
            <span className="platform-tag prime-cyan-text">CineMind</span>
          </div>

          {/* Quick TV Nav Pills */}
          <nav className="firetv-quick-nav">
            <span className="firetv-nav-pill active">Home</span>
            <span className="firetv-nav-pill" onClick={onNavigateSearch}>AI Search</span>
            <span className="firetv-nav-pill" onClick={onNavigateSearch}>Categories</span>
            {watchlist.length > 0 && (
              <span className="firetv-nav-pill watchlist-pill">
                My Stuff <span className="pill-counter">({watchlist.length})</span>
              </span>
            )}
          </nav>
        </div>

        <div className="topbar-right">
          {/* Alexa Voice Remote Indicator */}
          <button className="alexa-voice-chip" onClick={onNavigateSearch} title="Click to trigger voice search">
            <span className="alexa-mic-wave">🎙️</span>
            <span className="alexa-text">Ask Alexa</span>
          </button>

          <button className="topbar-search-chip" onClick={onNavigateSearch}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16" y2="16" />
            </svg>
            <span className="topbar-search-text">Search titles, actors, vibes...</span>
          </button>

          {userEmail ? (
            <div className="user-profile-pill" onClick={onOpenAuth}>
              <div className="pill-avatar">{userEmail[0].toUpperCase()}</div>
              <span className="user-pill-name">{userEmail.split("@")[0]}</span>
            </div>
          ) : (
            <button className="btn-signin-prime" onClick={onOpenAuth}>
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="home-scroll-container">
        {/* HERO BANNER SECTION — PRIME VIDEO CINEMATIC BILLBOARD */}
        <section className="hero-banner prime-billboard">
          <div
            className="hero-backdrop-img"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80)`,
            }}
          >
            <div className="hero-vignette-overlay prime-vignette" />
          </div>

          <div className="hero-content">
            <div className="hero-badge-row">
              <span className="badge-prime-firetv">🔥 #1 ON FIRE TV TODAY</span>
              <span className="badge-prime-check">✓ prime</span>
              <span className="badge-imdb">IMDb {heroMovie.rating}</span>
              <span className="hero-meta-tag">{heroMovie.year}</span>
              <span className="hero-meta-tag">2h 34m</span>
              <span className="badge-tech-pill">UHD 4K</span>
              <span className="badge-tech-pill">HDR10+</span>
              <span className="badge-tech-pill">Dolby Atmos</span>
            </div>

            <h1 className="hero-title">{heroMovie.title}</h1>
            <p className="hero-tagline">Fire TV AI Premiere • An Epic Historical Fantasy Across Centuries</p>
            <p className="hero-description">{heroMovie.overview}</p>

            {/* Action Buttons in Prime Video Aesthetics */}
            <div className="hero-cta-row">
              <button
                className="btn-hero-watch btn-prime-primary"
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
                className={`btn-hero-add btn-prime-secondary ${isHeroInWatchlist ? "added" : ""}`}
                onClick={handleToggleHeroWatchlist}
                title={isHeroInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                data-focusable
                tabIndex={0}
                aria-label={isHeroInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              >
                {isHeroInWatchlist ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    <span>Watchlist</span>
                  </>
                )}
              </button>

              <button
                className="btn-hero-ai btn-prime-alexa"
                onClick={() => setSelectedMovie(heroMovie)}
                data-focusable
                tabIndex={0}
              >
                <span>🎙️ Alexa AI Review</span>
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

        {/* CAROUSEL 1: SIGNATURE PRIME VIDEO "TOP 10 ON FIRE TV TODAY" WITH NUMBERED CARDS */}
        <section className="carousel-section prime-top10-section">
          <div className="section-title-row">
            <div className="prime-section-title-wrap">
              <span className="prime-ribbon-tag">TOP 10</span>
              <h3 className="section-heading">Top 10 Movies on Fire TV Today</h3>
            </div>
            <button className="view-all-link prime-view-link" onClick={onNavigateSearch}>
              See More &gt;
            </button>
          </div>

          <div className="horizontal-poster-row top10-row">
            {newReleases.map((item, index) => (
              <div
                key={item.id}
                className="portrait-card top10-card"
                onClick={() =>
                  setSelectedMovie({
                    title: item.title,
                    year: item.year,
                    rating: item.rating,
                    posterUrl: item.poster,
                    genre: item.genre,
                    overview: item.overview,
                    aiExplanation: item.aiExplanation,
                    matchScore: 96,
                    mediaType: "movie",
                  })
                }
                data-focusable
                tabIndex={0}
                aria-label={`Rank ${index + 1}: ${item.title}`}
              >
                {/* Amazon Prime Signature Big 3D Number */}
                <div className="top10-rank-number">{index + 1}</div>

                <div className="top10-poster-wrap">
                  <div className="prime-corner-badge">prime</div>
                  <img src={item.poster} alt={item.title} className="portrait-card-img" loading="lazy" />
                  <div className="portrait-card-overlay">
                    <h4 className="card-title">{item.title}</h4>
                    <div className="card-rating-row">
                      <span className="badge-imdb-sm">IMDb {item.rating}</span>
                      <span>{item.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAROUSEL 2: INCLUDED WITH FIRE TV (AI PICKS) */}
        <section className="carousel-section">
          <div className="section-title-row">
            <div className="prime-section-title-wrap">
              <span className="prime-check-tag">✓ prime</span>
              <h3 className="section-heading">Included with Fire TV — Curated by CineMind AI</h3>
            </div>
            <button className="view-all-link prime-view-link" onClick={onNavigateSearch}>
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
                    rating: item.rating,
                    posterUrl: item.poster,
                    genre: item.genre,
                    overview: item.overview,
                    aiExplanation: item.aiExplanation,
                    matchScore: 93,
                    mediaType: "tv",
                  })
                }
                data-focusable
                tabIndex={0}
              >
                {item.isLive ? (
                  <div className="card-top10-badge badge-live">LIVE 4K</div>
                ) : (
                  <div className="prime-corner-badge">prime</div>
                )}
                <img src={item.poster} alt={item.title} className="portrait-card-img" loading="lazy" />
                <div className="portrait-card-overlay">
                  <h4 className="card-title">{item.title}</h4>
                  <div className="card-rating-row">
                    <span className="badge-imdb-sm">★ {item.rating}</span>
                    <span>{item.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Fire TV Remote D-Pad Legend Footer */}
      <footer className="firetv-remote-legend-bar">
        <div className="legend-item">
          <kbd className="remote-key">▲</kbd>
          <kbd className="remote-key">▼</kbd>
          <kbd className="remote-key">◀</kbd>
          <kbd className="remote-key">▶</kbd>
          <span>D-Pad Navigate</span>
        </div>
        <div className="legend-item">
          <kbd className="remote-key">↵ Enter</kbd>
          <span>Watch Trailer</span>
        </div>
        <div className="legend-item">
          <kbd className="remote-key">W</kbd>
          <span>Add to Watchlist</span>
        </div>
        <div className="legend-item legend-alexa">
          <span className="alexa-glow-dot" />
          <span>Hold 🎙️ on Fire TV Remote to talk to CineMind</span>
        </div>
      </footer>

      {/* Interactive Movie Preview & Trailer Modal */}

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
