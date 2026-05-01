export const translations = {
  es: {
    navbar: {
      learnMore: "Conocer Más",
    },
    landing: {
      title: "¿Qué se necesita para ser rico?",
      subtitle: "Haz un test rápido para descubrirlo.",
      startTest: "Empezar test",
      learnMoreBtn: "Aprender más",
      infoTitle: "Lo que debes saber",
      infoLangTitle: "Sobre idioma e ingresos:",
      infoLang1: "Los bilingües español-inglés ganan en promedio 9.6% más que monolingües, ~$6,000/año adicionales.",
      infoLang2: "En EUA el premio salarial bilingüe sube a 18.8%, vs 12.7% promedio global.",
      infoLang3: "El español es el idioma más demandado en ofertas bilingües (86% de anuncios), pero paradójicamente paga menos porque hay mucha oferta.",
      infoLang4: "En estados con leyes de 'solo inglés', el bilingüismo no genera prima salarial.",
      infoGeoTitle: "Sobre geografía:",
      infoGeo1: "Un bilingüe en ciudad grande puede llegar a $67,000/año; en zona rural la ventaja es casi nula.",
      infoGeo2: "La geografía amplifica el bilingüismo, no lo reemplaza.",
      infoGeo3: "Un aumento del 46% en PIB per cápita mueve el bienestar apenas 0.38 puntos, pero un aumento de 0.09 en el Gini lo reduce 1.47 puntos — la desigualdad destruye bienestar más rápido de lo que el crecimiento lo construye.",
      infoSocTitle: "Sobre capital social:",
      infoSoc1: "Los vínculos débiles (conocidos) generan más oportunidades laborales que los fuertes (familia).",
      infoSoc2: "La posición en la red importa más que el número de contactos.",
      infoSoc3: "La conectividad con personas de alto SES (nivel socioeconómico) es uno de los predictores más fuertes de movilidad de ingresos."
    },
    quiz: {
      configSlide: {
        badge: "CONFIGURACIÓN",
        title: "¿Qué factores consideras importantes para el éxito?",
        capHumano: "Capital Humano (educación, exp.)",
        capSocial: "Capital Social (contactos)",
        geoContext: "Contexto Geográfico (ciudad, IDH)",
      },
      slide1: {
        badge: "SECCIÓN 1 · IDIOMA",
        title: "Habilidades de Idioma",
        q1: "¿Cuántos idiomas hablas? (1-8)",
        q2: "¿Cuál es tu dominio del inglés?",
      },
      slide2: {
        badge: "SECCIÓN 2 · EDUCACIÓN Y EXPERIENCIA",
        title: "Educación y Trabajo",
        q1: "¿Cuál es tu nivel educativo más alto?",
        q2: "¿Cuántos años de experiencia laboral tienes? (0-35)",
      },
      slide3: {
        badge: "SECCIÓN 3 · CONTEXTO GEOGRÁFICO",
        title: "La Ubicación Importa",
        q1: "¿En qué tipo de ciudad vives o trabajas?",
        q2: "IDH (Índice de Desarrollo Humano) de tu ciudad (0.40 - 1.00)",
      },
      slide4: {
        badge: "SECCIÓN 4 · CAPITAL SOCIAL",
        title: "Conexiones",
        subtext: "Cada tipo de contacto tiene un peso distinto en el modelo",
        q1: "Alto nivel socioeconómico (0-99)",
        q2: "Contactos puente (0-99)",
        q3: "Mismo nivel profesional (0-99)",
        q4: "Vínculos familia / amigos cercanos (0-99)",
      },
      results: {
        title: "ÍNDICE DE POTENCIAL",
        capHumano: "Capital Humano",
        capSocial: "Capital Social",
        geoContext: "Contexto Geográfico",
        totalLabel: "ÍNDICE TOTAL",
        level: "NIVEL",
        retest: "Volver a hacer el test",
        promptWarning: "Copia este texto y pégalo en tu IA favorita para un análisis personalizado:",
        promptText: (ch, cs, geo, total, niv, pCH, pCS, pGeo, profileStr, contactsStr) => `Acabo de realizar el test "MoneyGenius" basado en la fórmula del Capital Humano, Social y Contexto Geográfico.

Mis resultados son los siguientes:
- Capital Humano: ${ch}
- Capital Social: ${cs}
- Contexto Geográfico: ${geo}

Índice Total: ${total} (Nivel: ${niv})

Perfil ingresado:
${profileStr}

Capital social (contactos ponderados):
${contactsStr}

Detalles de mi configuración:
- Pesos del modelo aplicados -> Capital Humano: ${pCH}%, Capital Social: ${pCS}%, Contexto: ${pGeo}%

¿Me puedes dar un análisis detallado de mis resultados, explicarme mis áreas más fuertes, y darme estrategias específicas para aumentar mi potencial de ingresos?`,
      },
      navigation: {
        prev: "Atrás",
        next: "Siguiente",
        finish: "Terminar",
      },
      options: {
        educacion: {
          1: "Sin título formal",
          2: "Preparatoria",
          3: "Técnico / Vocacional",
          4: "Licenciatura",
          5: "Posgrado (maestría o doctorado)"
        },
        ingles: {
          1: "Ninguno",
          2: "Básico",
          3: "Fluido",
          4: "Nativo"
        },
        ciudad: {
          1: "Rural o zona fronteriza",
          2: "Ciudad mediana",
          3: "Área metropolitana en EUA"
        }
      }
    }
  },
  en: {
    navbar: {
      learnMore: "Learn More",
    },
    landing: {
      title: "What do you need to be rich?",
      subtitle: "Take a quick test to discover it.",
      startTest: "Start test",
      learnMoreBtn: "Learn more",
      infoTitle: "What you need to know",
      infoLangTitle: "On language and income:",
      infoLang1: "Spanish-English bilinguals earn on average 9.6% more than monolinguals, ~$6,000/year additional.",
      infoLang2: "In the US, the bilingual wage premium rises to 18.8%, vs the 12.7% global average.",
      infoLang3: "Spanish is the most demanded language in bilingual job postings (86% of ads), but paradoxically it pays less because there is a lot of supply.",
      infoLang4: "In states with 'English-only' laws, bilingualism does not generate a wage premium.",
      infoGeoTitle: "On geography:",
      infoGeo1: "A bilingual in a large city can reach $67,000/year; in a rural area the advantage is almost zero.",
      infoGeo2: "Geography amplifies bilingualism, it does not replace it.",
      infoGeo3: "A 46% increase in per capita GDP moves well-being by barely 0.38 points, but an increase of 0.09 in the Gini index reduces it by 1.47 points — inequality destroys well-being faster than growth builds it.",
      infoSocTitle: "On social capital:",
      infoSoc1: "Weak ties (acquaintances) generate more job opportunities than strong ties (family).",
      infoSoc2: "The position in the network matters more than the number of contacts.",
      infoSoc3: "Connectivity with high SES (socioeconomic status) individuals is one of the strongest predictors of income mobility."
    },
    quiz: {
      configSlide: {
        badge: "CONFIGURATION",
        title: "What factors do you consider important for success?",
        capHumano: "Human Capital (education, exp.)",
        capSocial: "Social Capital (connections)",
        geoContext: "Geographical Context (city, HDI)",
      },
      slide1: {
        badge: "SECTION 1 · LANGUAGE",
        title: "Language Skills",
        q1: "How many languages do you speak? (1-8)",
        q2: "What is your English proficiency level?",
      },
      slide2: {
        badge: "SECTION 2 · EDUCATION & EXPERIENCE",
        title: "Education & Work",
        q1: "What is your highest level of education?",
        q2: "How many years of work experience do you have? (0-35)",
      },
      slide3: {
        badge: "SECTION 3 · GEOGRAPHICAL CONTEXT",
        title: "Location matters",
        q1: "What type of city do you live or work in?",
        q2: "HDI (Human Development Index) of your city (0.40 - 1.00)",
      },
      slide4: {
        badge: "SECTION 4 · SOCIAL CAPITAL",
        title: "Connections",
        subtext: "Each type of connection has a distinct weight in the model",
        q1: "High socioeconomic level (0-99)",
        q2: "Bridge connections (0-99)",
        q3: "Same professional level (0-99)",
        q4: "Close family/friend ties (0-99)",
      },
      results: {
        title: "POTENTIAL INDEX",
        capHumano: "Human Capital",
        capSocial: "Social Capital",
        geoContext: "Geographical Context",
        totalLabel: "TOTAL INDEX",
        level: "LEVEL",
        retest: "Take test again",
        promptWarning: "Copy this text and paste it into your favorite AI for personalized analysis:",
        promptText: (ch, cs, geo, total, niv, pCH, pCS, pGeo, profileStr, contactsStr) => `I just took the "MoneyGenius" test based on the Human, Social, and Geographical Capital formula.

My results are:
- Human Capital: ${ch}
- Social Capital: ${cs}
- Geographical Context: ${geo}

Total Index: ${total} (Level: ${niv})

Entered Profile:
${profileStr}

Social Capital (weighted contacts):
${contactsStr}

Configuration details:
- Model weights applied -> Human Capital: ${pCH}%, Social Capital: ${pCS}%, Context: ${pGeo}%

Can you give me a detailed analysis of my results, explain my strongest areas, and provide specific strategies to increase my income potential?`,
      },
      navigation: {
        prev: "Prev",
        next: "Next",
        finish: "Finish",
      },
      options: {
        educacion: {
          1: "No formal degree",
          2: "High School",
          3: "Technical / Vocational",
          4: "Bachelor's Degree",
          5: "Postgraduate (Master's or Ph.D.)"
        },
        ingles: {
          1: "None",
          2: "Basic",
          3: "Fluent",
          4: "Native"
        },
        ciudad: {
          1: "Rural or border area",
          2: "Medium city",
          3: "Metropolitan area in USA"
        }
      }
    }
  }
};
