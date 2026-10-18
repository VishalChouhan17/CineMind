import React from "react";

interface SportsPageProps {
  onSearchSports: (query: string) => void;
  onBack: () => void;
}

export default function SportsPage({ onSearchSports, onBack }: SportsPageProps) {
  const sportsCategories = [
    { title: "Cricket Live & Tournaments", query: "Cricket documentary matches and sports movies", img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80" },
    { title: "Football / Premier League", query: "Football championship movies and sports documentaries", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80" },
    { title: "Formula 1 & Racing", query: "Formula 1 racing sports movies like Rush and Drive to Survive", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80" },
    { title: "MMA & Combat Fighting", query: "Boxing and MMA fighting movies like Creed and Warrior", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80" },
    { title: "Basketball Legends", query: "Basketball movies and Michael Jordan documentaries", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80" },
    { title: "Sports Biographies", query: "Inspiring true story sports biography movies", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80" },
  ];

  return (
    <div className="category-page-container">
      <header className="category-header">
        <button className="back-btn" onClick={onBack} data-focusable tabIndex={0}>← Home</button>
        <div>
          <h2>⚽ Sports Arena</h2>
          <p className="category-subtitle">Live action, iconic sports documentaries, and legendary tournaments.</p>
        </div>
      </header>

      <div className="category-grid">
        {sportsCategories.map((s, i) => (
          <div
            key={i}
            className="category-tile"
            onClick={() => onSearchSports(s.query)}
            data-focusable
            tabIndex={0}
            style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url(${s.img})` }}
          >
            <h3>{s.title}</h3>
            <span>Explore with AI &gt;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
