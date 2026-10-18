import { useState } from "react";
import { Recommendation } from "../types";

interface MovieCardProps {
  recommendation: Recommendation;
  rank: number;
  onSelect?: (rec: Recommendation) => void;
}

export default function MovieCard({ recommendation: rec, rank, onSelect }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const rating = typeof rec.rating === "number" ? rec.rating.toFixed(1) : "?";
  const score = rec.matchScore;
  const scoreColor = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div
      className="streaming-movie-card"
      role="listitem"
      tabIndex={0}
      data-focusable
      onClick={() => onSelect?.(rec)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSelect?.(rec);
        }
      }}
      aria-label={`${rank}. ${rec.title}, rated ${rating}/10. ${rec.aiExplanation}`}
    >
      {/* Subtle Rank Crown/Badge */}
      <div className={`card-rank-badge ${rank === 1 ? "top-rank" : ""}`}>
        {rank === 1 ? "★ #1" : `#${rank}`}
      </div>

      {/* Match Score */}
      <div className="card-match-pill" style={{ borderColor: scoreColor, color: scoreColor }}>
        {score}% Match
      </div>

      {/* Poster Image with clean fallback */}
      {rec.posterUrl && !imageError ? (
        <img
          className="streaming-card-poster"
          src={rec.posterUrl}
          alt={`${rec.title} poster`}
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="streaming-poster-placeholder">
          <span>🎬</span>
        </div>
      )}

      {/* Modern Gradient Info Card Overlay */}
      <div className="streaming-card-meta">
        <h3 className="card-movie-title" title={rec.title}>
          {rec.title}
        </h3>

        <div className="card-sub-info">
          <span className="meta-year">{rec.year}</span>
          <span className="meta-rating">★ {rating}</span>
          <span className="meta-genre-pill">{rec.mediaType === "tv" ? "TV Series" : "Movie"}</span>
        </div>
      </div>

      {/* Hover / Remote Focus Insight Box */}
      <div className="card-hover-drawer">
        <div className="drawer-header">
          <span className="drawer-title">{rec.title}</span>
          <span className="drawer-rating">★ {rating}</span>
        </div>
        <p className="drawer-why">{rec.aiExplanation}</p>
        <div className="drawer-footer">
          <button className="btn-drawer-watch">▶ Play</button>
          <span className="drawer-genre">{rec.genre || "Drama"}</span>
        </div>
      </div>
    </div>
  );
}
