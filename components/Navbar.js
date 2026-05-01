"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <Link href="/" className="logo">
          <span className="emoji-icon">💸</span>
          MoneyGenius
        </Link>
        <div className="nav-links">
          <button onClick={toggleLanguage} className="lang-toggle-btn" title="Change Language">
            {language === "es" ? "🇲🇽" : "🇺🇸"}
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-link">
            github.com
          </a>
          <Link href="/#learn-more" className="nav-link">
            {t.navbar.learnMore}
          </Link>
        </div>
      </div>
    </nav>
  );
}
