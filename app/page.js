"use client";

import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useRef } from 'react';

export default function Home() {
  const { t, language } = useLanguage();
  const infoRef = useRef(null);

  const scrollToInfo = () => {
    const target = infoRef.current;
    if (!target) return;

    const startPos = window.scrollY;
    // Removemos un poco del padding superior para que se encuadre perfecto visualmente
    const targetPos = target.getBoundingClientRect().top + window.scrollY - 60;
    const distance = targetPos - startPos;
    const duration = 1200; // 1.5s: Lento y elegante
    let startTime = null;

    // Easing function "easeInOutQuart" - Sensual y fluida
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPos + distance * easeInOutQuart(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <main className="landing-main">
      <Navbar />
      <div className="hero-container">
        <div className="hero-content ">
          <h1 className="title">{t.landing.title}</h1>
          <p className="subtitle">{t.landing.subtitle}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/quiz">
              <Button className="cta-button">{t.landing.startTest}</Button>
            </Link>
            <Button onClick={scrollToInfo} style={{ backgroundColor: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }}>
              {t.landing.learnMoreBtn}
            </Button>
          </div>
        </div>
      </div>

      <section id="learn-more" ref={infoRef} className="info-section">
        <div className="info-container">
          <h2 className="info-main-title">{t.landing.infoTitle}</h2>

          <div className="info-grid">
            <div className="info-card glass">
              <h3>{t.landing.infoLangTitle}</h3>
              <ul>
                <li>{t.landing.infoLang1}</li>
                <li>{t.landing.infoLang2}</li>
                <li>{t.landing.infoLang3}</li>
                <li>{t.landing.infoLang4}</li>
              </ul>
            </div>

            <div className="info-card glass">
              <h3>{t.landing.infoGeoTitle}</h3>
              <ul>
                <li>{t.landing.infoGeo1}</li>
                <li>{t.landing.infoGeo2}</li>
                <li>{t.landing.infoGeo3}</li>
              </ul>
            </div>

            <div className="info-card glass">
              <h3>{t.landing.infoSocTitle}</h3>
              <ul>
                <li>{t.landing.infoSoc1}</li>
                <li>{t.landing.infoSoc2}</li>
                <li>{t.landing.infoSoc3}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
