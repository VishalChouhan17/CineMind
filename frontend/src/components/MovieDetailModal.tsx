import React, { useEffect, useState } from "react";
import { Recommendation, Movie } from "../types";

interface MovieDetailModalProps {
  movie: (Recommendation | Movie) | null;
  isOpen: boolean;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movie: Recommendation | Movie) => void;
}

export default function MovieDetailModal({
  movie,
  isOpen,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}: MovieDetailModalProps) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Backspace") {
        if (isPlayingTrailer) {
          setIsPlayingTrailer(false);
        } else {
          onClose();
        }
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlayingTrailer, onClose]);

  if (!isOpen || !movie) return null;

  const aiExplanation = (movie as Recommendation).aiExplanation;
  const matchScore = (movie as Recommendation).matchScore;
  const rating = typeof movie.rating === "number" ? movie.rating.toFixed(1) : "8.2";
  const durationText = movie.duration ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m` : "2h 10m";

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="movie-detail-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          data-focusable
          tabIndex={0}
          title="Close (or press Back)"
        >
          ✕
        </button>

        {/* Modal Banner Hero */}
        <div
          className="modal-hero-cover"
          style={{
            backgroundImage: `linear-gradient(to top, #10121b 0%, rgba(16, 18, 27, 0.75) 50%, rgba(16, 18, 27, 0.3) 100%), url(${movie.posterUrl})`,
          }}
        >
          {isPlayingTrailer ? (
            <div className="trailer-player-frame">
              <iframe
                title={`${movie.title} Trailer`}
                src={`https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(movie.title + " official trailer")}&autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="trailer-iframe"
              />
              <button
                className="close-trailer-pill"
                onClick={() => setIsPlayingTrailer(false)}
                data-focusable
                tabIndex={0}
              >
                ✕ Close Trailer
              </button>
            </div>
          ) : (
            <div className="modal-hero-inner">
              <div className="modal-badges-row">
                {matchScore && (
                  <span className="badge-match-score">★ {matchScore}% Match</span>
                )}
                <span className="badge-media-type">
                  {movie.mediaType === "tv" ? "TV Series" : "Cinema"}
                </span>
                <span className="badge-quality">4K Ultra HD</span>
                <span className="badge-quality">5.1 Audio</span>
              </div>

              <h2 className="modal-movie-title">{movie.title}</h2>

              <div className="modal-meta-row">
                <span className="modal-year">{movie.year}</span>
                <span className="modal-rating">★ {rating}</span>
                <span className="modal-duration">{durationText}</span>
                <span className="modal-genre-tag">{movie.genre || "Drama / Cinematic"}</span>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions-row">
                <button
                  className="btn-play-hero"
                  onClick={() => setIsPlayingTrailer(true)}
                  data-focusable
                  tabIndex={0}
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play Trailer</span>
                </button>

                <button
                  className={`btn-watchlist-hero ${isWatchlisted ? "added" : ""}`}
                  onClick={() => onToggleWatchlist(movie)}
                  data-focusable
                  tabIndex={0}
                >
                  {isWatchlisted ? "✓ In Watchlist" : "➕ Watchlist"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body Details */}
        <div className="modal-body-content">
          {aiExplanation && (
            <div className="ai-curation-callout">
              <div className="callout-header">
                <span className="callout-icon">✨</span>
                <span className="callout-title">Why CineMind Recommends This:</span>
              </div>
              <p className="callout-text">{aiExplanation}</p>
            </div>
          )}

          <div className="modal-synopsis-section">
            <h4 className="section-title">Synopsis</h4>
            <p className="modal-overview-text">
              {movie.overview ||
                "A captivating story offering immersive performances, visual mastery, and an unforgettable viewing experience on Amazon Fire TV."}
            </p>
          </div>

          <div className="modal-tv-tip">
            <span>🎮 Tip: Use Fire TV Remote D-pad to navigate. Press Back (⌫) to return.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
