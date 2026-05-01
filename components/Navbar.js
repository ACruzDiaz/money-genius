import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <Link href="/" className="logo">
          <span className="emoji-icon">💸</span>
          MoneyGenius
        </Link>
        <div className="nav-links">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-link">
            github.com
          </a>
          <Link href="#learn-more" className="nav-link">
            Learn More
          </Link>
        </div>
      </div>
    </nav>
  );
}
