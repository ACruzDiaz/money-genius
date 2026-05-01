import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="landing-main">
      <Navbar />
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="title">What you need to be rich?</h1>
          <p className="subtitle">Take a quick test to discover it.</p>
          <Link href="/quiz">
            <Button className="cta-button">Start test</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
