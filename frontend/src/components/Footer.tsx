import React from "react";

export default function Footer() {
  return (
    <footer className="cinemind-footer">
      <div className="footer-container">
        {/* Upper Footer Links */}
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">Browse</h4>
            <ul>
              <li><a href="#movies">Top Movies</a></li>
              <li><a href="#series">TV & Web Series</a></li>
              <li><a href="#sports">Live Sports Arena</a></li>
              <li><a href="#korean">K-Drama Collection</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Experience</h4>
            <ul>
              <li><a href="#firetv">Amazon Fire TV Edition</a></li>
              <li><a href="#features">Voice Remote Support</a></li>
              <li><a href="#audio">Dolby Atmos & 4K UHD</a></li>
              <li><a href="#ai">Smart Mood Matching</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Account & Help</h4>
            <ul>
              <li><a href="#plans">Subscription Plans</a></li>
              <li><a href="#devices">Supported Devices</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Use</a></li>
            </ul>
          </div>

          <div className="footer-col footer-brand-col">
            <div className="footer-brand-title">
              <span className="brand-dot">●</span> CineMind Studio
            </div>
            <p className="footer-tagline">
              Next-generation streaming entertainment built for Amazon Fire TV & Vega OS.
            </p>
            <div className="footer-badge-row">
              <span className="tv-badge">Fire TV Certified</span>
              <span className="tv-badge">Ultra HD</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-bar">
          <p>© 2026 CineMind Inc. All rights reserved. Designed for Amazon Developer Hackathon.</p>
          <div className="footer-legal-links">
            <span>English (US)</span>
            <span>•</span>
            <span>Cookie Preferences</span>
            <span>•</span>
            <span>Help Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
