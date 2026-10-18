import React, { useState } from "react";

interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  query: string;
  badge?: string;
  count: string;
  img: string;
  gradient: string;
  group: "popular" | "mood" | "global" | "special";
}

interface CategoriesPageProps {
  onSelectCategory: (query: string) => void;
  onBack: () => void;
}

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "action",
    name: "Action & Blockbusters",
    subtitle: "High-octane adrenaline, car chases & superhero spectacles",
    query: "Top thrilling action movies and blockbuster cinema",
    badge: "🔥 Trending",
    count: "520+ Titles",
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(229, 9, 20, 0.85) 0%, rgba(20, 20, 30, 0.95) 100%)",
    group: "popular",
  },
  {
    id: "scifi",
    name: "Sci-Fi & Cyberpunk",
    subtitle: "Dystopian futures, artificial intelligence & interstellar travel",
    query: "Best science fiction cyberpunk space and mind bending movies",
    badge: "⚡ Featured",
    count: "380+ Titles",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(0, 168, 225, 0.85) 0%, rgba(13, 20, 40, 0.95) 100%)",
    group: "popular",
  },
  {
    id: "thriller",
    name: "Psychological Thrillers",
    subtitle: "Mind games, edge-of-your-seat suspense & unexpected twists",
    query: "Best psychological thrillers and dark suspense movies",
    badge: "🎯 Popular",
    count: "310+ Titles",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.85) 0%, rgba(15, 15, 26, 0.95) 100%)",
    group: "mood",
  },
  {
    id: "mindbending",
    name: "Mind-Bending & Paradoxes",
    subtitle: "Reality-shattering puzzles like Inception, Tenet & Shutter Island",
    query: "Mind-bending movies like Inception Shutter Island Tenet and Predestination",
    badge: "🧠 CineMind Pick",
    count: "190+ Titles",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.85) 0%, rgba(20, 15, 35, 0.95) 100%)",
    group: "mood",
  },
  {
    id: "crime",
    name: "Crime, Mafia & Mystery",
    subtitle: "Underworld cartels, gritty detective investigations & whodunits",
    query: "Best crime mafia gangster and detective mystery movies and series",
    badge: "⭐ Top Rated",
    count: "440+ Titles",
    img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.85) 0%, rgba(20, 18, 15, 0.95) 100%)",
    group: "popular",
  },
  {
    id: "horror",
    name: "Horror & Paranormal",
    subtitle: "Eerie haunted mysteries, creature features & bone-chilling frights",
    query: "Scary horror movies haunting supernatural thrillers",
    badge: "👻 Spooky",
    count: "260+ Titles",
    img: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(220, 38, 38, 0.85) 0%, rgba(10, 10, 15, 0.95) 100%)",
    group: "mood",
  },
  {
    id: "comedy",
    name: "Pure Comedy & Satire",
    subtitle: "Feel-good laughs, hilarious buddy trios & clever dark comedies",
    query: "Best comedy movies hilarious laugh out loud films",
    badge: "😂 Feel Good",
    count: "390+ Titles",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.85) 0%, rgba(10, 25, 20, 0.95) 100%)",
    group: "mood",
  },
  {
    id: "romance",
    name: "Romance & Melodrama",
    subtitle: "Heartwarming love sagas, emotional journeys & witty rom-coms",
    query: "Heartwarming romantic comedy and emotional romance movies",
    badge: "❤️ Heartfelt",
    count: "320+ Titles",
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.85) 0%, rgba(30, 15, 25, 0.95) 100%)",
    group: "mood",
  },
  {
    id: "kdrama",
    name: "K-Drama & East Asian Cinema",
    subtitle: "Gripping Korean thrillers, romantic Seoul dramas & historical epics",
    query: "Top rated Korean dramas and gripping East Asian cinema",
    badge: "✨ Viral Hits",
    count: "290+ Titles",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.85) 0%, rgba(25, 15, 25, 0.95) 100%)",
    group: "global",
  },
  {
    id: "anime",
    name: "Anime & Animation",
    subtitle: "Visionary Studio Ghibli magic, shonen battles & cyberpunk anime",
    query: "Best anime movies and animated series masterpieces",
    badge: "🌟 Iconic",
    count: "270+ Titles",
    img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(14, 165, 233, 0.85) 0%, rgba(20, 15, 35, 0.95) 100%)",
    group: "global",
  },
  {
    id: "family",
    name: "Family & Animated Adventures",
    subtitle: "Wholesome entertainment, magical worlds & stories for every age",
    query: "Wholesome family adventure animated movies for all ages",
    count: "340+ Titles",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.85) 0%, rgba(15, 20, 35, 0.95) 100%)",
    group: "popular",
  },
  {
    id: "documentary",
    name: "Documentaries & True Crime",
    subtitle: "Untold historical secrets, captivating nature & shocking real investigations",
    query: "Best investigative true crime documentaries and nature films",
    badge: "📽️ Real Stories",
    count: "240+ Titles",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80",
    gradient: "linear-gradient(135deg, rgba(107, 114, 128, 0.85) 0%, rgba(15, 18, 25, 0.95) 100%)",
    group: "special",
  },
];

export default function CategoriesPage({ onSelectCategory, onBack }: CategoriesPageProps) {
  const [activeTab, setActiveTab] = useState<"all" | "popular" | "mood" | "global" | "special">("all");
  const [filterSearch, setFilterSearch] = useState("");

  const filteredCategories = CATEGORIES_DATA.filter((c) => {
    const matchesTab = activeTab === "all" || c.group === activeTab;
    const matchesSearch =
      c.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(filterSearch.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="category-page-container">
      {/* Top Header */}
      <header className="category-header">
        <button
          className="back-btn"
          onClick={onBack}
          data-focusable
          tabIndex={0}
          title="Back to Home"
          aria-label="Back to Home"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span>Home</span>
        </button>

        <div className="category-title-group">
          <div className="category-title-row">
            <span className="category-icon-badge">⊞</span>
            <h1 className="category-main-heading">Explore Categories</h1>
          </div>
          <p className="category-subtitle">
            Curated genres, cinematic universes, and moods tailored for your evening
          </p>
        </div>
      </header>

      {/* Filter and Quick Search Bar */}
      <div className="categories-filter-bar">
        <div className="category-tabs-group">
          <button
            className={`cat-tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
            data-focusable
            tabIndex={0}
          >
            All Genres ({CATEGORIES_DATA.length})
          </button>
          <button
            className={`cat-tab-btn ${activeTab === "popular" ? "active" : ""}`}
            onClick={() => setActiveTab("popular")}
            data-focusable
            tabIndex={0}
          >
            🔥 Popular & Action
          </button>
          <button
            className={`cat-tab-btn ${activeTab === "mood" ? "active" : ""}`}
            onClick={() => setActiveTab("mood")}
            data-focusable
            tabIndex={0}
          >
            🎭 Mood & Thrillers
          </button>
          <button
            className={`cat-tab-btn ${activeTab === "global" ? "active" : ""}`}
            onClick={() => setActiveTab("global")}
            data-focusable
            tabIndex={0}
          >
            🌏 Anime & K-Drama
          </button>
          <button
            className={`cat-tab-btn ${activeTab === "special" ? "active" : ""}`}
            onClick={() => setActiveTab("special")}
            data-focusable
            tabIndex={0}
          >
            📽️ Docu & Real
          </button>
        </div>

        <div className="cat-search-box">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16" y2="16" />
          </svg>
          <input
            type="text"
            placeholder="Filter categories..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            className="cat-filter-input"
          />
          {filterSearch && (
            <button className="cat-clear-btn" onClick={() => setFilterSearch("")}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="category-showcase-grid">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="category-card-card"
            onClick={() => onSelectCategory(cat.query)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSelectCategory(cat.query);
              }
            }}
            data-focusable
            tabIndex={0}
            role="button"
            aria-label={`Explore ${cat.name}`}
          >
            {/* Background image & gradient overlay */}
            <div
              className="cat-card-bg"
              style={{
                backgroundImage: `${cat.gradient}, url(${cat.img})`,
              }}
            />

            {/* Badges */}
            <div className="cat-card-top">
              {cat.badge && <span className="cat-card-badge">{cat.badge}</span>}
              <span className="cat-card-count">{cat.count}</span>
            </div>

            {/* Bottom Content */}
            <div className="cat-card-bottom">
              <h3 className="cat-card-title">{cat.name}</h3>
              <p className="cat-card-desc">{cat.subtitle}</p>
              <div className="cat-explore-link">
                <span>Browse Titles</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="no-categories-found">
            <p>No categories found matching "{filterSearch}"</p>
            <button className="btn-secondary" onClick={() => setFilterSearch("")}>
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
