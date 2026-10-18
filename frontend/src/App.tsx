import { useState, useCallback } from "react";
import { AppPage, SearchQuery, Recommendation } from "./types";
import { useRecommendations } from "./hooks/useRecommendations";
import Sidebar from "./components/Sidebar";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import SportsPage from "./pages/SportsPage";
import CategoriesPage from "./pages/CategoriesPage";
import "./styles/global.css";
import "./styles/components.css";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [lastQuery, setLastQuery] = useState<SearchQuery | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem("cinemind_user_email") || null;
  });

  const { recommendations, isLoading, error, fetchRecommendations, clearRecommendations } =
    useRecommendations();

  const navigate = useCallback((page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = useCallback(
    async (query: SearchQuery) => {
      setLastQuery(query);
      navigate("results");
      await fetchRecommendations(query);
    },
    [navigate, fetchRecommendations]
  );

  const handleMoodSelect = useCallback(
    (moodId: string, moodLabel: string) => {
      const q: SearchQuery = {
        query: moodLabel,
        mood: moodId,
        aiProvider: lastQuery?.aiProvider || "openai",
      };
      setLastQuery(q);
      navigate("results");
      fetchRecommendations(q);
    },
    [navigate, lastQuery, fetchRecommendations]
  );

  const handleCategorySearch = useCallback(
    (queryStr: string) => {
      const q: SearchQuery = {
        query: queryStr,
        aiProvider: lastQuery?.aiProvider || "openai",
      };
      setLastQuery(q);
      navigate("results");
      fetchRecommendations(q);
    },
    [navigate, lastQuery, fetchRecommendations]
  );

  const handleLogin = (email: string) => {
    setUserEmail(email);
    localStorage.setItem("cinemind_user_email", email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem("cinemind_user_email");
  };

  return (
    <div className="app-shell">
      {/* Permanent Streaming Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={navigate}
        onOpenAuth={() => setIsAuthOpen(true)}
        userEmail={userEmail}
      />

      {/* Main Screen Outlet with Smooth Scroll & Footer */}
      <main className="main-content-area">
        <div className="content-inner-wrapper">
          {currentPage === "home" && (
            <HomePage
              onNavigateSearch={() => navigate("search")}
              onMoodSelect={handleMoodSelect}
              onOpenAuth={() => setIsAuthOpen(true)}
              userEmail={userEmail}
            />
          )}

          {currentPage === "search" && (
            <SearchPage
              initialQuery={lastQuery}
              onSearch={handleSearch}
              onBack={() => navigate("home")}
            />
          )}

          {currentPage === "entertainment" && (
            <EntertainmentPage
              onSearchGenre={handleCategorySearch}
              onBack={() => navigate("home")}
            />
          )}

          {currentPage === "sports" && (
            <SportsPage
              onSearchSports={handleCategorySearch}
              onBack={() => navigate("home")}
            />
          )}

          {currentPage === "categories" && (
            <CategoriesPage
              onSelectCategory={handleCategorySearch}
              onBack={() => navigate("home")}
            />
          )}

          {currentPage === "results" && (
            <ResultsPage
              recommendations={recommendations as Recommendation[]}
              isLoading={isLoading}
              error={error}
              query={lastQuery?.query || ""}
              aiProvider={lastQuery?.aiProvider || "openai"}
              onBack={() => {
                clearRecommendations();
                navigate("home");
              }}
              onNewSearch={() => navigate("search")}
            />
          )}
        </div>

        {/* Global Premium Streaming Footer */}
        <Footer />
      </main>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={userEmail}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
