import React, { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

export default function AuthModal({ isOpen, onClose, currentUser, onLogin, onLogout }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    setError("");
    onLogin(email);
    onClose();
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {currentUser ? (
          <div className="auth-logged-in-view">
            <div className="user-avatar-large">
              {currentUser.substring(0, 2).toUpperCase()}
            </div>
            <h2>Welcome back!</h2>
            <p className="auth-user-email">{currentUser}</p>
            <div className="auth-status-pill">● Premium Member (Fire TV Ready)</div>

            <div className="auth-actions">
              <button className="btn-netflix-signout" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="auth-header">
              <h1 className="netflix-logo-text">CINEMIND</h1>
              <h2>{isSignUp ? "Create Your Account" : "Sign In to CineMind"}</h2>
              <p className="auth-subtitle">
                Unlock unlimited AI-curated entertainment, live sports & voice search.
              </p>
            </div>

            {error && <div className="auth-error-banner">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-netflix-red">
                {isSignUp ? "Get Started" : "Sign In"}
              </button>

              <div className="auth-switch-text">
                {isSignUp ? (
                  <span>
                    Already have an account?{" "}
                    <button type="button" className="link-btn" onClick={() => setIsSignUp(false)}>
                      Sign in now.
                    </button>
                  </span>
                ) : (
                  <span>
                    New to CineMind?{" "}
                    <button type="button" className="link-btn" onClick={() => setIsSignUp(true)}>
                      Sign up now.
                    </button>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
