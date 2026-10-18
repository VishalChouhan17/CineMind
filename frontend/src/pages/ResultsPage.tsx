import { useState, useEffect } from "react";
import { useDpadNavigation } from "../hooks/useDpadNavigation";
import { Recommendation } from "../types";
import MovieCard from "../components/MovieCard";
import MovieDetailModal from "../components/MovieDetailModal";
import { isMovieInWatchlist, toggleMovieWatchlist, WatchlistMovie } from "../utils/watchlist";

interface ResultsPageProps {
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  query: string;
  aiProvider: string;
  onBack: () => void;
  onNewSearch: () => void;
}

export default function ResultsPage({
  recommendations,
  isLoading,
  error,
  query,
  aiProvider,
  onBack,
  onNewSearch,
}: ResultsPageProps) {
  const gridRef = useDpadNavigation({ columns: 5, onBack });
  const [selectedMovie, setSelectedMovie] = useState<Recommendation | null>(null);
  const [, setSyncTick] = useState(0);

  useEffect(() => {
    const handleSync = () => setSyncTick((t) => t + 1);
    window.addEventListener("cinemind_watchlist_updated", handleSync);
    return () => window.removeEventListener("cinemind_watchlist_updated", handleSync);
  }, []);

  const handleToggleWatchlist = (movie: any) => {
    toggleMovieWatchlist(movie as WatchlistMovie);
  };

  // 1. Cinematic Loading Screen (No mentions of Gemini)
  if (isLoading) {
    return (
      <div className="results-loading-screen">
        <div className="loading-vignette" />
        <div className="loading-content-center">
          <div className="cinema-radar-spinner">
            <div className="radar-circle" />
            <div className="radar-beam" />
            <div className="radar-logo">🎬</div>
          </div>

          <h2 className="loading-headline">Curating Your Personalized Collection</h2>
          <p className="loading-query-tag">Searching titles matching "{query}"...</p>
          <div className="loading-progress-bar">
            <div className="progress-fill" />
          </div>

          <div className="loading-features-row">
            <span>✓ Analyzing Plot Themes</span>
            <span>✓ Scanning Ratings & Cast</span>
            <span>✓ Matching Cinematic Mood</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error Screen
  if (error) {
    return (
      <div className="results-empty-state">
        <div className="empty-state-card">
          <div className="empty-icon">⚠️</div>
          <h2>Unable to fetch titles</h2>
          <p className="empty-sub">{error}</p>
          <div className="empty-actions-row">
            <button className="btn-results-primary" onClick={onNewSearch} data-focusable tabIndex={0}>
              🔍 Search Again
            </button>
            <button className="btn-results-secondary" onClick={onBack} data-focusable tabIndex={0}>
              ← Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. No Results Screen
  if (recommendations.length === 0) {
    return (
      <div className="results-empty-state">
        <div className="empty-state-card">
          <div className="empty-icon">🎬</div>
          <h2>No matching titles found</h2>
          <p className="empty-sub">
            We couldn't find exact matches for "{query}". Try checking another genre or relaxing your filters.
          </p>
          <button className="btn-results-primary" onClick={onNewSearch} data-focusable tabIndex={0}>
            🔍 Search Another Movie
          </button>
        </div>
      </div>
    );
  }

  // 4. Main Results View
  return (
    <div className="results-page-wrapper">
      {/* Premium Glass Top Navigation Bar */}
      <header className="results-sticky-header">
        <div className="results-header-left">
          <button
            className="btn-nav-back"
            onClick={onBack}
            data-focusable
            tabIndex={0}
            title="Go Back"
            aria-label="Back to previous page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          <div className="results-title-block">
            <span className="results-kicker">
              {aiProvider === "bedrock" ? "☁️ AWS BEDROCK CURATED" : "✨ AI CURATED FOR YOU"}
            </span>
            <h1 className="results-main-title">{query}</h1>
          </div>
        </div>

        <div className="results-header-right">
          <div className="ai-provider-badge-pill">
            <span className="provider-dot" />
            <span>{aiProvider === "bedrock" ? "AWS Bedrock (Claude 3)" : "GPT-4o Mini Engine"}</span>
          </div>

          <div className="results-count-pill">
            <span className="count-number">{recommendations.length}</span>
            <span className="count-label">Titles Found</span>
          </div>

          <button
            className="btn-nav-search"
            onClick={onNewSearch}
            data-focusable
            tabIndex={0}
            title="Start new search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16" y2="16" />
            </svg>
            <span>New Search</span>
          </button>
        </div>
      </header>

      {/* Modern Results Grid */}
      <div className="results-scroll-body">
        <div
          ref={gridRef}
          className="streaming-results-grid"
          role="list"
          aria-label="Movie and show recommendations"
        >
          {recommendations.map((rec, index) => (
            <MovieCard
              key={rec.tmdbId}
              recommendation={rec}
              rank={index + 1}
              onSelect={setSelectedMovie}
            />
          ))}
        </div>

        {/* Fire TV D-Pad Remote Control Legend */}
        <div className="firetv-remote-legend-bar">
          <div className="legend-chip">
            <span className="key-badge">▲▼◀▶</span>
            <span>D-Pad Navigate</span>
          </div>
          <div className="legend-chip">
            <span className="key-badge">↵ Enter</span>
            <span>Watch Trailer / Details</span>
          </div>
          <div className="legend-chip">
            <span className="key-badge">⌫ Back</span>
            <span>Previous Screen</span>
          </div>
        </div>
      </div>

      {/* Interactive Movie Preview & Trailer Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isWatchlisted={selectedMovie ? isMovieInWatchlist(selectedMovie.title) : false}
        onToggleWatchlist={handleToggleWatchlist}
      />
    </div>
  );
}
