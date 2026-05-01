/**
 * Calculadora de Potencial de Ingresos
 * Basada en el modelo de Capital Humano + Capital Social + Contexto Geográfico
 *
 * Uso: node calculadora_capital_humano.js
 */

const readline = require("readline");

const interfazTerminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ─────────────────────────────────────────────
// TABLAS DE REFERENCIA
// ─────────────────────────────────────────────

const NIVELES_EDUCATIVOS = {
  1: { etiqueta: "Sin título formal",  multiplicador: 0.50 },
  2: { etiqueta: "Preparatoria",       multiplicador: 0.70 },
  3: { etiqueta: "Técnico / Vocacional", multiplicador: 0.85 },
  4: { etiqueta: "Licenciatura",       multiplicador: 1.00 },
  5: { etiqueta: "Posgrado (maestría o doctorado)", multiplicador: 1.30 },
};

const DOMINIO_INGLES = {
  1: { etiqueta: "Ninguno",  multiplicador: 0.50 },
  2: { etiqueta: "Básico",   multiplicador: 0.80 },
  3: { etiqueta: "Fluido",   multiplicador: 1.00 },
  4: { etiqueta: "Nativo",   multiplicador: 1.15 },
};

const TIPO_CIUDAD = {
  1: { etiqueta: "Rural o zona fronteriza",       multiplicador: 0.50 },
  2: { etiqueta: "Ciudad mediana",                multiplicador: 0.80 },
  3: { etiqueta: "Área metropolitana en EUA",     multiplicador: 1.10 },
};

// Pesos por defecto del modelo (deben sumar 100)
const PESOS_MODELO = {
  capitalHumano:      40,   // % de influencia en el índice final
  capitalSocial:      25,   // % de influencia en el índice final
  contextoGeografico: 35,   // % de influencia en el índice final
};

// Multiplicadores del capital social por tipo de contacto
const PONDERACION_CONTACTOS = {
  altoNivelSocioeconomico: 3.0,
  contactoPuente:          2.0,   // acceso a un círculo completamente nuevo
  mismoNivel:              1.0,
  vinculoFuertesFamilia:   0.5,
};

// ─────────────────────────────────────────────
// UTILIDADES
// ─────────────────────────────────────────────

/**
 * Pregunta algo al usuario y devuelve su respuesta como Promise<string>
 */
function preguntar(mensaje) {
  return new Promise((resolve) => {
    interfazTerminal.question(mensaje, (respuesta) => {
      resolve(respuesta.trim());
    });
  });
}

/**
 * Pregunta un número entero dentro de un rango válido.
 * Repite la pregunta si la entrada es inválida.
 */
async function preguntarEntero(mensaje, minimo, maximo) {
  while (true) {
    const entrada = await preguntar(mensaje);
    const numero = parseInt(entrada, 10);
    if (!isNaN(numero) && numero >= minimo && numero <= maximo) {
      return numero;
    }
    console.log(`  ⚠  Ingresa un número entre ${minimo} y ${maximo}.\n`);
  }
}

/**
 * Pregunta un número decimal dentro de un rango válido.
 */
async function preguntarDecimal(mensaje, minimo, maximo) {
  while (true) {
    const entrada = await preguntar(mensaje);
    const numero = parseFloat(entrada);
    if (!isNaN(numero) && numero >= minimo && numero <= maximo) {
      return numero;
    }
    console.log(`  ⚠  Ingresa un número entre ${minimo} y ${maximo}.\n`);
  }
}

/**
 * Muestra un menú numerado y devuelve la opción elegida.
 */
async function elegirOpcion(titulo, opciones) {
  console.log(`\n  ${titulo}`);
  for (const [clave, opcion] of Object.entries(opciones)) {
    console.log(`    ${clave}. ${opcion.etiqueta}`);
  }
  const claves = Object.keys(opciones);
  const minimo = parseInt(claves[0]);
  const maximo = parseInt(claves[claves.length - 1]);
  return await preguntarEntero(`  Tu elección (${minimo}-${maximo}): `, minimo, maximo);
}

// ─────────────────────────────────────────────
// CÁLCULOS DEL MODELO
// ─────────────────────────────────────────────

/**
 * Calcula el boost por número de idiomas.
 * El primer idioma adicional (bilingüismo) tiene el mayor impacto.
 * Cada idioma posterior suma menos (rendimiento decreciente).
 *
 * 1 idioma  → 0.60
 * 2 idiomas → 1.00  (base)
 * 3+        → 1.00 + (n - 2) * 0.12
 */
function calcularBoostIdiomas(numeroDeIdiomas) {
  if (numeroDeIdiomas === 1) return 0.60;
  if (numeroDeIdiomas === 2) return 1.00;
  return 1.00 + (numeroDeIdiomas - 2) * 0.12;
}

/**
 * Calcula el boost por años de experiencia laboral.
 * Usa logaritmo natural para reflejar rendimientos decrecientes:
 * los primeros años aportan mucho, los últimos menos.
 */
function calcularBoostExperiencia(aniosDeExperiencia) {
  return 1 + Math.log1p(aniosDeExperiencia) * 0.18;
}

/**
 * Calcula el índice de Capital Humano (escala abierta, base ≈ 100).
 */
function calcularCapitalHumano(datos) {
  const boostIdiomas     = calcularBoostIdiomas(datos.numeroDeIdiomas);
  const boostExperiencia = calcularBoostExperiencia(datos.aniosDeExperiencia);
  const multEducacion    = NIVELES_EDUCATIVOS[datos.nivelEducativo].multiplicador;
  const multIngles       = DOMINIO_INGLES[datos.dominioIngles].multiplicador;

  return boostIdiomas * multIngles * multEducacion * boostExperiencia * 100;
}

/**
 * Calcula el índice de Capital Social ponderando cada tipo de contacto.
 */
function calcularCapitalSocial(contactos) {
  const puntosAltoNivel  = contactos.altoNivelSocioeconomico * PONDERACION_CONTACTOS.altoNivelSocioeconomico;
  const puntosPuente     = contactos.contactosPuente         * PONDERACION_CONTACTOS.contactoPuente;
  const puntosMismoNivel = contactos.contactosMismoNivel     * PONDERACION_CONTACTOS.mismoNivel;
  const puntosVinculo    = contactos.vinculosFuertesFamilia  * PONDERACION_CONTACTOS.vinculoFuertesFamilia;

  const puntajeTotal = puntosAltoNivel + puntosPuente + puntosMismoNivel + puntosVinculo;

  return {
    puntajeTotal,
    desglose: {
      puntosAltoNivel,
      puntosPuente,
      puntosMismoNivel,
      puntosVinculo,
    },
  };
}

/**
 * Calcula el índice de Contexto Geográfico.
 * Combina tipo de ciudad con el IDH local (0.4 – 1.0).
 */
function calcularContextoGeografico(datos) {
  const multCiudad = TIPO_CIUDAD[datos.tipoCiudad].multiplicador;
  return multCiudad * datos.idhLocal * 130;
}

/**
 * Combina los tres índices usando los pesos del modelo.
 * Los pesos se normalizan automáticamente si no suman 100.
 */
function calcularIndiceTotal(indiceCapitalHumano, indiceCapitalSocial, indiceContextoGeografico) {
  const sumaPesos = PESOS_MODELO.capitalHumano + PESOS_MODELO.capitalSocial + PESOS_MODELO.contextoGeografico;

  const pesoNormalizadoCH  = PESOS_MODELO.capitalHumano      / sumaPesos;
  const pesoNormalizadoCS  = PESOS_MODELO.capitalSocial      / sumaPesos;
  const pesoNormalizadoGeo = PESOS_MODELO.contextoGeografico / sumaPesos;

  return (
    indiceCapitalHumano      * pesoNormalizadoCH  +
    indiceCapitalSocial      * pesoNormalizadoCS  +
    indiceContextoGeografico * pesoNormalizadoGeo
  );
}

/**
 * Determina el nivel de potencial según el índice total.
 */
function determinarNivelPotencial(indiceTotal) {
  if (indiceTotal < 50)  return "Potencial bajo";
  if (indiceTotal < 80)  return "Potencial medio-bajo";
  if (indiceTotal < 110) return "Potencial medio";
  if (indiceTotal < 150) return "Potencial alto";
  return "Potencial muy alto";
}

// ─────────────────────────────────────────────
// PRESENTACIÓN DE RESULTADOS
// ─────────────────────────────────────────────

function mostrarResultados(datos, contactos, indices) {
  const separador = "─".repeat(52);

  console.log(`\n${separador}`);
  console.log("  RESULTADO — ÍNDICE DE POTENCIAL DE INGRESOS");
  console.log(separador);

  console.log("\n  Perfil ingresado:");
  console.log(`    Idiomas hablados       : ${datos.numeroDeIdiomas}`);
  console.log(`    Dominio del inglés     : ${DOMINIO_INGLES[datos.dominioIngles].etiqueta}`);
  console.log(`    Nivel educativo        : ${NIVELES_EDUCATIVOS[datos.nivelEducativo].etiqueta}`);
  console.log(`    Años de experiencia    : ${datos.aniosDeExperiencia}`);
  console.log(`    Tipo de ciudad         : ${TIPO_CIUDAD[datos.tipoCiudad].etiqueta}`);
  console.log(`    IDH local              : ${datos.idhLocal.toFixed(2)}`);

  console.log("\n  Capital social (contactos ponderados):");
  console.log(`    Alto nivel (×3)        : ${contactos.altoNivelSocioeconomico} contactos = ${indices.desgloseCS.puntosAltoNivel} pts`);
  console.log(`    Puente / acceso (×2)   : ${contactos.contactosPuente} contactos = ${indices.desgloseCS.puntosPuente} pts`);
  console.log(`    Mismo nivel (×1)       : ${contactos.contactosMismoNivel} contactos = ${indices.desgloseCS.puntosMismoNivel} pts`);
  console.log(`    Vínculos familia (×0.5): ${contactos.vinculosFuertesFamilia} contactos = ${indices.desgloseCS.puntosVinculo} pts`);

  console.log(`\n${separador}`);
  console.log(`  Sub-índices:`);
  console.log(`    Capital humano         : ${Math.round(indices.capitalHumano)}`);
  console.log(`    Capital social         : ${Math.round(indices.capitalSocial)}`);
  console.log(`    Contexto geográfico    : ${Math.round(indices.contextoGeografico)}`);

  console.log(`\n  Pesos aplicados:`);
  console.log(`    Capital humano         : ${PESOS_MODELO.capitalHumano}%`);
  console.log(`    Capital social         : ${PESOS_MODELO.capitalSocial}%`);
  console.log(`    Contexto geográfico    : ${PESOS_MODELO.contextoGeografico}%`);

  console.log(`\n  Fórmula:`);
  console.log(
    `    CH(${Math.round(indices.capitalHumano)})×${PESOS_MODELO.capitalHumano}% + ` +
    `CS(${Math.round(indices.capitalSocial)})×${PESOS_MODELO.capitalSocial}% + ` +
    `GEO(${Math.round(indices.contextoGeografico)})×${PESOS_MODELO.contextoGeografico}%`
  );

  console.log(`\n  ► ÍNDICE TOTAL : ${Math.round(indices.total)}`);
  console.log(`  ► NIVEL        : ${determinarNivelPotencial(indices.total)}`);
  console.log(`${separador}\n`);
}

// ─────────────────────────────────────────────
// FLUJO PRINCIPAL
// ─────────────────────────────────────────────

async function main() {
  console.log("\n══════════════════════════════════════════════════════");
  console.log("   CALCULADORA DE POTENCIAL DE INGRESOS");
  console.log("   Modelo: Capital Humano × Social × Geográfico");
  console.log("══════════════════════════════════════════════════════\n");

  // — SECCIÓN 1: IDIOMA —
  console.log("  ── SECCIÓN 1 · IDIOMA ──────────────────────────────");

  const numeroDeIdiomas = await preguntarEntero(
    "  ¿Cuántos idiomas hablas? (1-8): ",
    1, 8
  );

  const dominioIngles = await elegirOpcion(
    "¿Cuál es tu dominio del inglés?",
    DOMINIO_INGLES
  );

  // — SECCIÓN 2: EDUCACIÓN Y EXPERIENCIA —
  console.log("\n  ── SECCIÓN 2 · EDUCACIÓN Y EXPERIENCIA ─────────────");

  const nivelEducativo = await elegirOpcion(
    "¿Cuál es tu nivel educativo más alto?",
    NIVELES_EDUCATIVOS
  );

  const aniosDeExperiencia = await preguntarEntero(
    "  ¿Cuántos años de experiencia laboral tienes? (0-35): ",
    0, 35
  );

  // — SECCIÓN 3: GEOGRAFÍA —
  console.log("\n  ── SECCIÓN 3 · CONTEXTO GEOGRÁFICO ─────────────────");

  const tipoCiudad = await elegirOpcion(
    "¿En qué tipo de ciudad vives o trabajas?",
    TIPO_CIUDAD
  );

  const idhLocal = await preguntarDecimal(
    "  IDH (Índice de Desarrollo Humano) de tu ciudad (0.40 - 1.00): ",
    0.40, 1.00
  );

  // — SECCIÓN 4: CAPITAL SOCIAL —
  console.log("\n  ── SECCIÓN 4 · CAPITAL SOCIAL (contactos) ───────────");
  console.log("  Cada tipo de contacto tiene un peso distinto en el modelo.\n");

  const contactosAltoNivel = await preguntarEntero(
    "  Contactos de alto nivel socioeconómico (ejecutivos, directores, etc.) (0-99): ",
    0, 99
  );

  const contactosPuente = await preguntarEntero(
    "  Contactos puente — te conectan a un círculo completamente nuevo (0-99): ",
    0, 99
  );

  const contactosMismoNivel = await preguntarEntero(
    "  Contactos de tu mismo nivel profesional (0-199): ",
    0, 199
  );

  const vinculosFuertesFamilia = await preguntarEntero(
    "  Vínculos fuertes de familia o amigos muy cercanos (0-99): ",
    0, 99
  );

  // — CÁLCULOS —
  const datosPersonales = {
    numeroDeIdiomas,
    dominioIngles,
    nivelEducativo,
    aniosDeExperiencia,
    tipoCiudad,
    idhLocal,
  };

  const datosContactos = {
    altoNivelSocioeconomico: contactosAltoNivel,
    contactosPuente,
    contactosMismoNivel,
    vinculosFuertesFamilia,
  };

  const indiceCapitalHumano      = calcularCapitalHumano(datosPersonales);
  const resultadoCapitalSocial   = calcularCapitalSocial(datosContactos);
  const indiceCapitalSocial      = resultadoCapitalSocial.puntajeTotal * 0.8;
  const indiceContextoGeografico = calcularContextoGeografico(datosPersonales);
  const indiceTotal              = calcularIndiceTotal(
    indiceCapitalHumano,
    indiceCapitalSocial,
    indiceContextoGeografico
  );

  const indices = {
    capitalHumano:      indiceCapitalHumano,
    capitalSocial:      indiceCapitalSocial,
    contextoGeografico: indiceContextoGeografico,
    total:              indiceTotal,
    desgloseCS:         resultadoCapitalSocial.desglose,
  };

  // — RESULTADOS —
  mostrarResultados(datosPersonales, datosContactos, indices);

  interfazTerminal.close();
}

main().catch((error) => {
  console.error("Error inesperado:", error);
  interfazTerminal.close();
});