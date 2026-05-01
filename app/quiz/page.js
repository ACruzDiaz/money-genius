"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { computeAllResults, NIVELES_EDUCATIVOS, DOMINIO_INGLES, TIPO_CIUDAD } from "@/lib/calculator";
import { useLanguage } from "@/components/LanguageContext";

const getScoreColor = (total) => {
  if (total < 25) return "#ef4444"; // Rojo
  if (total < 50) return "#f97316"; // Naranja
  if (total < 80) return "#eab308"; // Amarillo
  if (total < 110) return "#84cc16"; // Verde claro
  if (total < 160) return "#22c55e"; // Verde intenso
  return "#06b6d4"; // Cyan
};

export default function QuizPage() {
  const { t } = useLanguage();
  const [slide, setSlide] = useState(0);

  // Form State
  const [pesos, setPesos] = useState({
    capitalHumano: 40,
    capitalSocial: 25,
    contextoGeografico: 35,
  });

  const [datosPersonales, setDatosPersonales] = useState({
    numeroDeIdiomas: 1,
    dominioIngles: 1,
    nivelEducativo: 1,
    aniosDeExperiencia: 0,
    tipoCiudad: 2,
    idhLocal: 0.75,
  });

  const [datosContactos, setDatosContactos] = useState({
    altoNivelSocioeconomico: 0,
    contactosPuente: 0,
    contactosMismoNivel: 0,
    vinculosFuertesFamilia: 0,
  });

  const [results, setResults] = useState(null);

  const handleNext = () => setSlide((s) => Math.min(s + 1, 5));
  const handlePrev = () => setSlide((s) => Math.max(s - 1, 0));

  const handleFinish = () => {
    const res = computeAllResults(datosPersonales, datosContactos, pesos);
    setResults(res);
    setSlide(5);
  };

  const updatePersonal = (field, value) => {
    setDatosPersonales((prev) => ({ ...prev, [field]: Number(value) }));
  };

  const updateContactos = (field, value) => {
    setDatosContactos((prev) => ({ ...prev, [field]: Number(value) }));
  };

  const updatePeso = (key, rawValue) => {
    const val = parseInt(rawValue, 10);
    const oldVal = pesos[key];
    const diff = val - oldVal;

    const others = Object.keys(pesos).filter((k) => k !== key);
    const totalOthers = pesos[others[0]] + pesos[others[1]];

    let newPesos = { ...pesos, [key]: val };

    if (totalOthers === 0) {
      newPesos[others[0]] = Math.floor(-diff / 2);
      newPesos[others[1]] = Math.ceil(-diff / 2);
    } else {
      const p0 = pesos[others[0]] / totalOthers;
      const exact0 = pesos[others[0]] - diff * p0;

      newPesos[others[0]] = Math.round(exact0);
      newPesos[others[1]] = 100 - val - newPesos[others[0]];
    }

    // Ensure bounds
    if (newPesos[others[0]] < 0) {
      newPesos[others[1]] += newPesos[others[0]];
      newPesos[others[0]] = 0;
    } else if (newPesos[others[1]] < 0) {
      newPesos[others[0]] += newPesos[others[1]];
      newPesos[others[1]] = 0;
    }

    setPesos(newPesos);
  };

  return (
    <main className="quiz-main">
      <Navbar />
      <div className="quiz-container">
        <div className="glass quiz-card">

          {/* Slide 0: Configuracion de Pesos */}
          {slide === 0 && (
            <div className="slide-content">
              <span className="section-badge">{t.quiz.configSlide.badge}</span>
              <h2 className="slide-title">{t.quiz.configSlide.title}</h2>

              <div className="input-group">
                <label>{t.quiz.configSlide.capHumano}: {pesos.capitalHumano}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pesos.capitalHumano}
                  onChange={(e) => updatePeso("capitalHumano", e.target.value)}
                  className="range-slider"
                />
              </div>

              <div className="input-group">
                <label>{t.quiz.configSlide.capSocial}: {pesos.capitalSocial}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pesos.capitalSocial}
                  onChange={(e) => updatePeso("capitalSocial", e.target.value)}
                  className="range-slider"
                />
              </div>

              <div className="input-group">
                <label>{t.quiz.configSlide.geoContext}: {pesos.contextoGeografico}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pesos.contextoGeografico}
                  onChange={(e) => updatePeso("contextoGeografico", e.target.value)}
                  className="range-slider"
                />
              </div>
            </div>
          )}

          {/* Slide 1 */}
          {slide === 1 && (
            <div className="slide-content">
              <span className="section-badge">{t.quiz.slide1.badge}</span>
              <h2 className="slide-title">{t.quiz.slide1.title}</h2>

              <div className="input-group">
                <label>{t.quiz.slide1.q1}: {datosPersonales.numeroDeIdiomas}</label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={datosPersonales.numeroDeIdiomas}
                  onChange={(e) => updatePersonal("numeroDeIdiomas", e.target.value)}
                  className="range-slider"
                />
              </div>

              <div className="input-group">
                <label>{t.quiz.slide1.q2}</label>
                <select
                  value={datosPersonales.dominioIngles}
                  onChange={(e) => updatePersonal("dominioIngles", e.target.value)}
                  className="select-input"
                >
                  {Object.entries(DOMINIO_INGLES).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.etiqueta}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Slide 2 */}
          {slide === 2 && (
            <div className="slide-content">
              <span className="section-badge">{t.quiz.slide2.badge}</span>
              <h2 className="slide-title">{t.quiz.slide2.title}</h2>

              <div className="input-group">
                <label>{t.quiz.slide2.q1}</label>
                <select
                  value={datosPersonales.nivelEducativo}
                  onChange={(e) => updatePersonal("nivelEducativo", e.target.value)}
                  className="select-input"
                >
                  {Object.entries(NIVELES_EDUCATIVOS).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.etiqueta}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>{t.quiz.slide2.q2}</label>
                <input
                  type="number"
                  min="0"
                  max="35"
                  value={datosPersonales.aniosDeExperiencia || ""}
                  onChange={(e) => updatePersonal("aniosDeExperiencia", e.target.value)}
                  className="number-input"
                />
              </div>
            </div>
          )}

          {/* Slide 3 */}
          {slide === 3 && (
            <div className="slide-content">
              <span className="section-badge">{t.quiz.slide3.badge}</span>
              <h2 className="slide-title">{t.quiz.slide3.title}</h2>

              <div className="input-group">
                <label>{t.quiz.slide3.q1}</label>
                <select
                  value={datosPersonales.tipoCiudad}
                  onChange={(e) => updatePersonal("tipoCiudad", e.target.value)}
                  className="select-input"
                >
                  {Object.entries(TIPO_CIUDAD).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.etiqueta}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>{t.quiz.slide3.q2}:</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.40"
                  max="1.00"
                  value={datosPersonales.idhLocal}
                  onChange={(e) => updatePersonal("idhLocal", e.target.value)}
                  className="number-input"
                />
              </div>
            </div>
          )}

          {/* Slide 4 */}
          {slide === 4 && (
            <div className="slide-content">
              <span className="section-badge">{t.quiz.slide4.badge}</span>
              <h2 className="slide-title">{t.quiz.slide4.title}</h2>
              <p className="subtext">{t.quiz.slide4.subtext}</p>

              <div className="input-group">
                <label>{t.quiz.slide4.q1}: {datosContactos.altoNivelSocioeconomico}</label>
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={datosContactos.altoNivelSocioeconomico}
                  onChange={(e) => updateContactos("altoNivelSocioeconomico", e.target.value)}
                  className="range-slider"
                />
              </div>

              <div className="input-group">
                <label>{t.quiz.slide4.q2}: {datosContactos.contactosPuente}</label>
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={datosContactos.contactosPuente}
                  onChange={(e) => updateContactos("contactosPuente", e.target.value)}
                  className="range-slider"
                />
              </div>

              <div className="input-group">
                <label>{t.quiz.slide4.q3}: {datosContactos.contactosMismoNivel}</label>
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={datosContactos.contactosMismoNivel}
                  onChange={(e) => updateContactos("contactosMismoNivel", e.target.value)}
                  className="range-slider"
                />
              </div>

              <div className="input-group">
                <label>{t.quiz.slide4.q4}: {datosContactos.vinculosFuertesFamilia}</label>
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={datosContactos.vinculosFuertesFamilia}
                  onChange={(e) => updateContactos("vinculosFuertesFamilia", e.target.value)}
                  className="range-slider"
                />
              </div>
            </div>
          )}

          {/* Results Slide 5 */}
          {slide === 5 && results && (
            <div className="slide-content results-content">
              <h2 className="slide-title results-title">{t.quiz.results.title}</h2>

              <div className="results-grid">
                <div className="stat-box">
                  <span className="stat-label">{t.quiz.results.capHumano}</span>
                  <span className="stat-value">{Math.round(results.capitalHumano)}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">{t.quiz.results.capSocial}</span>
                  <span className="stat-value">{Math.round(results.capitalSocial)}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">{t.quiz.results.geoContext}</span>
                  <span className="stat-value">{Math.round(results.contextoGeografico)}</span>
                </div>
              </div>

              <div
                className="final-score"
                style={{
                  backgroundColor: getScoreColor(results.total),
                  boxShadow: `0 4px 15px ${getScoreColor(results.total)}33` // 20% opacity glow, smaller than before
                }}
              >
                <div className="score-total">
                  <span className="score-label">{t.quiz.results.totalLabel}</span>
                  <span className="score-number">{Math.round(results.total)}</span>
                </div>
                <div className="score-level">
                  {t.quiz.results.level}: <strong>{results.nivel}</strong>
                </div>
              </div>

              <div className="llm-prompt-section">
                <p className="llm-instructions">{t.quiz.results.promptWarning}</p>
                <textarea
                  readOnly
                  className="llm-prompt-box"
                  value={t.quiz.results.promptText(
                    Math.round(results.capitalHumano),
                    Math.round(results.capitalSocial),
                    Math.round(results.contextoGeografico),
                    Math.round(results.total),
                    results.nivel,
                    pesos.capitalHumano,
                    pesos.capitalSocial,
                    pesos.contextoGeografico
                  )}
                  onClick={(e) => e.target.select()}
                />
              </div>

              <Link href="/">
                <Button className="retest-button">{t.quiz.results.retest}</Button>
              </Link>
            </div>
          )}

          {/* Navigation */}
          {slide < 5 && (
            <div className="carousel-nav">
              <Button onClick={handlePrev} className={`nav-btn ${slide === 0 ? "hidden" : ""}`}>
                {t.quiz.navigation.prev}
              </Button>

              {slide < 4 ? (
                <Button onClick={handleNext} className="nav-btn">{t.quiz.navigation.next}</Button>
              ) : (
                <Button onClick={handleFinish} className="cta-button">{t.quiz.navigation.finish}</Button>
              )}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
