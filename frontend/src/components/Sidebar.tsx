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
      {/* Top Logo: Custom CineMind Brand Glyph (Cinema 'C' + Neuro-Aperture + Play Pulse) */}
      <div className="sidebar-brand" onClick={() => onNavigate("home")} title="CineMind">
        <svg
          className="cinemind-logo-svg"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cm-grad-cyan" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="55%" stopColor="#0088FE" />
              <stop offset="100%" stopColor="#8A2BE2" />
            </linearGradient>
            <linearGradient id="cm-grad-accent" x1="12" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF3366" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
            <filter id="cm-glow-filter" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00E5FF" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Outer Cinema 'C' Sculpted Track */}
          <path
            d="M28 8.5C25.5 6.8 22.8 6 20 6C12.268 6 6 12.268 6 20C6 27.732 12.268 34 20 34C23.2 34 26.1 32.9 28.5 31"
            stroke="url(#cm-grad-cyan)"
            strokeWidth="3.6"
            strokeLinecap="round"
            filter="url(#cm-glow-filter)"
          />

          {/* Inner Mind / Cinema Reel Aperture Arc */}
          <path
            d="M20 12C15.58 12 12 15.58 12 20C12 24.42 15.58 28 20 28"
            stroke="url(#cm-grad-accent)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />

          {/* Center Play Pulse */}
          <path
            d="M18.5 15.5L26 20L18.5 24.5V15.5Z"
            fill="url(#cm-grad-cyan)"
          />

          {/* Neural Synapse Nodes at C endpoints */}
          <circle cx="28" cy="8.5" r="2.2" fill="#00E5FF" />
          <circle cx="28.5" cy="31" r="2.2" fill="#8A2BE2" />
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
