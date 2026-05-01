"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { computeAllResults, NIVELES_EDUCATIVOS, DOMINIO_INGLES, TIPO_CIUDAD } from "@/lib/calculator";

export default function QuizPage() {
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
              <span className="section-badge">CONFIGURACIÓN</span>
              <h2 className="slide-title">¿Qué factores consideras importantes para el éxito?</h2>

              <div className="input-group">
                <label>Capital Humano (educación, idiomas, exp.): {pesos.capitalHumano}%</label>
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
                <label>Capital Social (contactos, círculos): {pesos.capitalSocial}%</label>
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
                <label>Contexto Geográfico (ciudad, IDH): {pesos.contextoGeografico}%</label>
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
              <span className="section-badge">SECCIÓN 1 · IDIOMA</span>
              <h2 className="slide-title">Language Skills</h2>

              <div className="input-group">
                <label>¿Cuántos idiomas hablas? (1-8): {datosPersonales.numeroDeIdiomas}</label>
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
                <label>¿Cuál es tu dominio del inglés?</label>
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
              <span className="section-badge">SECCIÓN 2 · EDUCACIÓN Y EXPERIENCIA</span>
              <h2 className="slide-title">Education & Work</h2>

              <div className="input-group">
                <label>¿Cuál es tu nivel educativo más alto?</label>
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
                <label>¿Cuántos años de experiencia laboral tienes? (0-35)</label>
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
              <span className="section-badge">SECCIÓN 3 · CONTEXTO GEOGRÁFICO</span>
              <h2 className="slide-title">Location matters</h2>

              <div className="input-group">
                <label>¿En qué tipo de ciudad vives o trabajas?</label>
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
                <label>IDH (Índice de Desarrollo Humano) de tu ciudad (0.40 - 1.00):</label>
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
              <span className="section-badge">SECCIÓN 4 · CAPITAL SOCIAL</span>
              <h2 className="slide-title">Connections</h2>
              <p className="subtext">Cada tipo de contacto tiene un peso distinto en el modelo</p>

              <div className="input-group">
                <label>Alto nivel socioeconómico (0-99): {datosContactos.altoNivelSocioeconomico}</label>
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
                <label>Contactos puente (0-99): {datosContactos.contactosPuente}</label>
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
                <label>Mismo nivel profesional (0-99): {datosContactos.contactosMismoNivel}</label>
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
                <label>Vínculos familia / amigos cercanos (0-99): {datosContactos.vinculosFuertesFamilia}</label>
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
              <h2 className="slide-title results-title">ÍNDICE DE POTENCIAL</h2>

              <div className="results-grid">
                <div className="stat-box">
                  <span className="stat-label">Capital Humano</span>
                  <span className="stat-value">{Math.round(results.capitalHumano)}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Capital Social</span>
                  <span className="stat-value">{Math.round(results.capitalSocial)}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Contexto Geográfico</span>
                  <span className="stat-value">{Math.round(results.contextoGeografico)}</span>
                </div>
              </div>

              <div className="final-score">
                <div className="score-total">
                  <span className="score-label">ÍNDICE TOTAL</span>
                  <span className="score-number">{Math.round(results.total)}</span>
                </div>
                <div className="score-level">
                  NIVEL: <strong>{results.nivel}</strong>
                </div>
              </div>

              <div className="llm-prompt-section">
                <p className="llm-instructions">Copia este texto y pégalo en tu IA favorita para un análisis personalizado:</p>
                <textarea
                  readOnly
                  className="llm-prompt-box"
                  value={`Acabo de realizar el test "MoneyGenius" basado en la fórmula del Capital Humano, Social y Contexto Geográfico.\n\nMis resultados son los siguientes:\n- Capital Humano: ${Math.round(results.capitalHumano)}\n- Capital Social: ${Math.round(results.capitalSocial)}\n- Contexto Geográfico: ${Math.round(results.contextoGeografico)}\n\nÍndice Total: ${Math.round(results.total)} (Nivel: ${results.nivel})\n\nDetalles de mi configuración:\n- Pesos del modelo aplicados -> Capital Humano: ${pesos.capitalHumano}%, Capital Social: ${pesos.capitalSocial}%, Contexto: ${pesos.contextoGeografico}%\n\n¿Me puedes dar un análisis detallado de mis resultados, explicarme mis áreas más fuertes, y darme estrategias específicas para aumentar mi potencial de ingresos?`}
                  onClick={(e) => e.target.select()}
                />
              </div>

              <Link href="/">
                <Button className="retest-button">Take test again</Button>
              </Link>
            </div>
          )}

          {/* Navigation */}
          {slide < 5 && (
            <div className="carousel-nav">
              <Button onClick={handlePrev} className={`nav-btn ${slide === 0 ? "hidden" : ""}`}>
                Prev
              </Button>

              {slide < 4 ? (
                <Button onClick={handleNext} className="nav-btn">Next</Button>
              ) : (
                <Button onClick={handleFinish} className="cta-button">Finish</Button>
              )}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
