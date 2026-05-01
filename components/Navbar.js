"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <Link href="/" className="logo">
          <span className="emoji-icon">💸</span>
          MoneyGenius
        </Link>
        <div className="nav-links">
          {/* Mostramos los botones de toggle */}
          {mounted && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={toggleTheme}
                className="lang-toggle-btn"
                title="Toggle Theme"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
              <button
                onClick={toggleLanguage}
                className="lang-toggle-btn"
                title="Change Language"
              >
                {language === "es" ? "🗽" : "🌮"}
              </button>
            </div>
          )}
          <a href="https://github.com/ACruzDiaz" target="_blank" rel="noreferrer" className="nav-link">
            GitHub
          </a>
          {/* <Link href="/#learn-more" className="nav-link">
            {t.navbar.learnMore}
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
