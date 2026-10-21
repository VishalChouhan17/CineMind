import React from "react";
import { AppPage } from "../types";

interface SidebarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onOpenAuth: () => void;
  userEmail: string | null;
}

export default function Sidebar({ currentPage, onNavigate, onOpenAuth, userEmail }: SidebarProps) {
  return (
    <aside className="cinemind-sidebar">
      {/* Top Logo: Amazon Fire TV + CineMind Emblem */}
      <div className="sidebar-brand" onClick={() => onNavigate("home")} title="CineMind on Fire TV">
        <svg
          className="cinemind-logo-svg"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="prime-grad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00A8E1" />
              <stop offset="100%" stopColor="#007198" />
            </linearGradient>
            <linearGradient id="amazon-smile-grad" x1="8" y1="28" x2="36" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF9900" />
              <stop offset="100%" stopColor="#FFB84D" />
            </linearGradient>
            <filter id="prime-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00A8E1" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Fire TV Cinema Aperture Circle */}
          <rect x="3" y="3" width="38" height="38" rx="10" fill="#131c28" stroke="#00A8E1" strokeWidth="2" filter="url(#prime-glow)" />

          {/* Cinema 'C' Track */}
          <path
            d="M28 14C26 12 23.5 11 20 11C14.5 11 11 15 11 20.5C11 26 14.5 30 20 30C23.5 30 26 29 28 27"
            stroke="url(#prime-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Play Triangle */}
          <path d="M19 16.5L25 20.5L19 24.5V16.5Z" fill="#00A8E1" />

          {/* Amazon Fire TV Orange Smile Curve */}
          <path
            d="M13 32.5C18 36 26 36 31 32.5"
            stroke="url(#amazon-smile-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Arrowhead */}
          <path d="M30 30.5L32 33L29 34" fill="#FF9900" />
        </svg>
      </div>

      {/* Nav Menu */}
      <nav className="sidebar-nav">
        {/* Home */}
        <button
          className={`sidebar-btn ${currentPage === "home" ? "active" : ""}`}
          onClick={() => onNavigate("home")}
          data-focusable
          tabIndex={0}
          title="Home"
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="sidebar-label">Home</span>
        </button>

        {/* Search */}
        <button
          className={`sidebar-btn ${currentPage === "search" ? "active" : ""}`}
          onClick={() => onNavigate("search")}
          data-focusable
          tabIndex={0}
          title="AI Search"
          aria-label="AI Search"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16" y2="16" />
          </svg>
          <span className="sidebar-label">Search</span>
        </button>

        {/* Entertainment */}
        <button
          className={`sidebar-btn ${currentPage === "entertainment" ? "active" : ""}`}
          onClick={() => onNavigate("entertainment")}
          data-focusable
          tabIndex={0}
          title="Entertainment (TV & Shows)"
          aria-label="Entertainment"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
          </svg>
          <span className="sidebar-label">Entertainment</span>
        </button>

        {/* Sports */}
        <button
          className={`sidebar-btn ${currentPage === "sports" ? "active" : ""}`}
          onClick={() => onNavigate("sports")}
          data-focusable
          tabIndex={0}
          title="Sports"
          aria-label="Sports"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
          </svg>
          <span className="sidebar-label">Sports</span>
        </button>

        {/* Categories Grid Icon */}
        <button
          className={`sidebar-btn ${currentPage === "categories" ? "active" : ""}`}
          onClick={() => onNavigate("categories")}
          data-focusable
          tabIndex={0}
          title="Categories & Genres"
          aria-label="Categories"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
          </svg>
          <span className="sidebar-label">Categories</span>
        </button>
      </nav>

      {/* Profile / Auth at Bottom */}
      <div className="sidebar-footer">
        <button
          className="sidebar-btn profile-btn"
          onClick={onOpenAuth}
          data-focusable
          tabIndex={0}
          title={userEmail ? `Signed in as ${userEmail}` : "Sign In"}
          aria-label="Account / Sign in"
        >
          {userEmail ? (
            <div className="user-avatar-badge">
              {userEmail.substring(0, 2).toUpperCase()}
            </div>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          )}
          <span className="sidebar-label">{userEmail ? "Account" : "Sign In"}</span>
        </button>
      </div>
    </aside>
  );
}
