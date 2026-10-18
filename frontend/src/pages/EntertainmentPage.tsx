import React from "react";

interface EntertainmentPageProps {
  onSearchGenre: (query: string) => void;
  onBack: () => void;
}

export default function EntertainmentPage({ onSearchGenre, onBack }: EntertainmentPageProps) {
  const categories = [
    { name: "Blockbuster Movies", query: "Top blockbuster cinematic movies", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80" },
    { name: "Binge-Worthy TV Shows", query: "Best binge-worthy crime and drama TV series", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80" },
    { name: "Romantic K-Dramas", query: "Best romantic Korean dramas with emotional story", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80" },
    { name: "Stand-Up Comedy", query: "Hilarious stand up comedy specials and comedy films", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80" },
    { name: "Sci-Fi & Mind-Bending", query: "Sci-fi mind bending films like Inception and Interstellar", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80" },
    { name: "Crime & Mystery", query: "Dark crime mystery thrillers and detective whodunits", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80" },
  ];

  return (
    <div className="category-page-container">
      <header className="category-header">
        <button className="back-btn" onClick={onBack} data-focusable tabIndex={0}>← Home</button>
        <div>
          <h2>🎭 Entertainment Hub</h2>
          <p className="category-subtitle">Explore top trending TV shows, web series, and blockbuster cinema.</p>
        </div>
      </header>

      <div className="category-grid">
        {categories.map((c, i) => (
          <div
            key={i}
            className="category-tile"
            onClick={() => onSearchGenre(c.query)}
            data-focusable
            tabIndex={0}
            style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url(${c.img})` }}
          >
            <h3>{c.name}</h3>
            <span>Explore with AI &gt;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
