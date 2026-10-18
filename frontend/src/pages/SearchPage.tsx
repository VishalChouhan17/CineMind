import { useState, useRef, useEffect, FormEvent } from "react";
import { SearchQuery, MOODS, LANGUAGES, DURATION_OPTIONS } from "../types";

interface SearchPageProps {
  initialQuery: SearchQuery | null;
  onSearch: (query: SearchQuery) => void;
  onBack: () => void;
}

const POPULAR_SEARCHES = [
  "🔥 Trending Action & Thrillers",
  "❤️ Best Romantic K-Dramas",
  "🧠 Mind-Bending Sci-Fi like Inception",
  "😂 Standup Comedy & Feel-Good Movies",
  "🕵️ Dark Murder Mystery Whodunit",
  "⚽ High-Stakes Sports & F1 Documentaries",
  "🏆 Award-Winning Drama Mini-Series",
];

const GENRE_CHIPS = [
  { label: "Action", icon: "💥" },
  { label: "Thriller", icon: "😱" },
  { label: "Comedy", icon: "😂" },
  { label: "Sci-Fi", icon: "🚀" },
  { label: "Romance", icon: "❤️" },
  { label: "Horror", icon: "👻" },
  { label: "Crime", icon: "🕵️" },
  { label: "Documentary", icon: "🎥" },
  { label: "Animation", icon: "🎨" },
  { label: "Sports", icon: "⚽" },
];

export default function SearchPage({ initialQuery, onSearch, onBack }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery?.query || "");
  const [mood, setMood] = useState(initialQuery?.mood || "");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [maxDuration, setMaxDuration] = useState<number | undefined>(initialQuery?.maxDuration);
  const [language, setLanguage] = useState(initialQuery?.language || "any");
  const [aiProvider, setAiProvider] = useState<"openai" | "gemini" | "bedrock">(initialQuery?.aiProvider || "openai");
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function toggleVoiceSearch() {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setVoiceFeedback("Speech recognition not supported in this browser. Type your search.");
      setTimeout(() => setVoiceFeedback(null), 3500);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = language && language !== "any" ? language : "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setVoiceFeedback("🎙️ Listening... speak your movie or mood request");

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setQuery(transcript);
          setVoiceFeedback(`Heard: "${transcript}"`);
          setTimeout(() => setVoiceFeedback(null), 2500);
          onSearch({
            query: transcript,
            mood: mood || undefined,
            maxDuration,
            language,
            aiProvider,
          });
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        setVoiceFeedback("Voice capture cancelled or microphone unavailable.");
        setTimeout(() => setVoiceFeedback(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  }

  function handleGenreClick(genre: string) {
    if (selectedGenre === genre) {
      setSelectedGenre("");
    } else {
      setSelectedGenre(genre);
      setQuery(`Best ${genre} movies and series`);
    }
  }

  function handleMoodClick(selectedMoodId: string, label: string) {
    if (mood === selectedMoodId) {
      setMood("");
    } else {
      setMood(selectedMoodId);
      setQuery(`${label} movies`);
    }
  }

  function handleQuickChip(text: string) {
    // Strip leading emoji
    const cleanText = text.replace(/^[^\w\s]+/, "").trim();
    setQuery(cleanText);
    onSearch({
      query: cleanText,
      mood: mood || undefined,
      maxDuration,
      language,
      aiProvider,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const effectiveQuery = query.trim() || (selectedGenre ? `${selectedGenre} movies` : "") || (mood ? `${mood} movies` : "");
    if (!effectiveQuery) return;

    onSearch({
      query: effectiveQuery,
      mood: mood || undefined,
      maxDuration,
      language,
      aiProvider,
    });
  }

  return (
    <div className="search-page-container">
      {/* Search Header */}
      <div className="search-top-nav">
        <button className="back-btn" onClick={onBack} data-focusable tabIndex={0}>
          ← Home
        </button>
        <div className="search-header-meta">
          <h1 className="search-title">Ask CineMind AI</h1>
          <p className="search-subtitle">
            Search with voice-friendly prompts, natural language, or pick your preferences below.
          </p>
        </div>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="search-form-layout">
        <div className="search-input-hero">
          <div className="search-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16" y2="16" />
            </svg>
          </div>
          <input
            ref={inputRef}
            className="search-input-field"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            maxLength={400}
            placeholder='What do you want to watch? e.g. "Find me a thriller under 2 hours"'
            data-focusable
            tabIndex={0}
          />
          {query && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear query"
            >
              ✕
            </button>
          )}

          {/* Alexa Voice Search Button */}
          <button
            type="button"
            className={`btn-voice-search ${isListening ? "listening" : ""}`}
            onClick={toggleVoiceSearch}
            title={isListening ? "Listening... Speak now!" : "Alexa Voice Search (Press to speak)"}
            aria-label="Voice Search"
            data-focusable
            tabIndex={0}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
            <span className="voice-label">{isListening ? "Listening..." : "Voice"}</span>
          </button>

          <button type="submit" className="btn-search-submit" data-focusable tabIndex={0}>
            Search
          </button>
        </div>

        {/* Live Voice Status Feedback */}
        {voiceFeedback && (
          <div className="voice-status-feedback">
            <span>{voiceFeedback}</span>
          </div>
        )}

        {/* Quick Instant Suggestions */}
        <div className="search-section-block">
          <label className="search-section-heading">💡 Popular AI Searches (1-Click)</label>
          <div className="quick-suggestions-wrap">
            {POPULAR_SEARCHES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="suggestion-pill"
                onClick={() => handleQuickChip(item)}
                data-focusable
                tabIndex={0}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Genre Tags */}
        <div className="search-section-block">
          <label className="search-section-heading">🎬 Browse by Genre</label>
          <div className="genre-chips-wrap">
            {GENRE_CHIPS.map((g, idx) => (
              <button
                key={idx}
                type="button"
                className={`genre-chip-btn ${selectedGenre === g.label ? "active" : ""}`}
                onClick={() => handleGenreClick(g.label)}
                data-focusable
                tabIndex={0}
              >
                <span>{g.icon}</span>
                <span>{g.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Filters Row */}
        <div className="search-filters-row">
          {/* Mood Curation */}
          <div className="filter-group-card">
            <label className="filter-group-label">🎭 Mood Curation</label>
            <div className="filter-chip-row">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`sub-chip ${mood === m.id ? "active" : ""}`}
                  onClick={() => handleMoodClick(m.id, m.label)}
                  data-focusable
                  tabIndex={0}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="filter-group-card">
            <label className="filter-group-label">⏱️ Duration</label>
            <div className="filter-chip-row">
              {DURATION_OPTIONS.map((d) => (
                <button
                  key={d.label}
                  type="button"
                  className={`sub-chip ${maxDuration === d.max ? "active" : ""}`}
                  onClick={() => setMaxDuration(maxDuration === d.max ? undefined : d.max)}
                  data-focusable
                  tabIndex={0}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="filter-group-card">
            <label className="filter-group-label">🌍 Audio & Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="styled-dropdown"
              data-focusable
              tabIndex={0}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* AI Engine & Action Bar */}
        <div className="search-action-bar">
          <div className="ai-engine-select">
            <span className="ai-engine-label">AI Engine:</span>
            <div className="engine-toggle-group">
              <button
                type="button"
                className={`engine-btn ${aiProvider === "openai" ? "active" : ""}`}
                onClick={() => setAiProvider("openai")}
                data-focusable
                tabIndex={0}
              >
                🤖 OpenAI (GPT-4o-mini)
              </button>
              <button
                type="button"
                className={`engine-btn ${aiProvider === "bedrock" ? "active" : ""}`}
                onClick={() => setAiProvider("bedrock")}
                data-focusable
                tabIndex={0}
              >
                ☁️ AWS Bedrock
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary-glow"
            disabled={!query.trim() && !mood && !selectedGenre}
            data-focusable
            tabIndex={0}
          >
            🎬 Generate Recommendations
          </button>
        </div>
      </form>
    </div>
  );
}
