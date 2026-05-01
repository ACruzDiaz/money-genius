/**
 * Calculator logic ported from calculatorScript.js
 */

export const NIVELES_EDUCATIVOS = {
  1: { etiqueta: "Sin título formal", multiplicador: 0.5 },
  2: { etiqueta: "Preparatoria", multiplicador: 0.7 },
  3: { etiqueta: "Técnico / Vocacional", multiplicador: 0.85 },
  4: { etiqueta: "Licenciatura", multiplicador: 1.0 },
  5: { etiqueta: "Posgrado (maestría o doctorado)", multiplicador: 1.3 },
};

export const DOMINIO_INGLES = {
  1: { etiqueta: "Ninguno", multiplicador: 0.5 },
  2: { etiqueta: "Básico", multiplicador: 0.8 },
  3: { etiqueta: "Fluido", multiplicador: 1.0 },
  4: { etiqueta: "Nativo", multiplicador: 1.15 },
};

export const TIPO_CIUDAD = {
  1: { etiqueta: "Rural o zona fronteriza", multiplicador: 0.5 },
  2: { etiqueta: "Ciudad mediana", multiplicador: 0.8 },
  3: { etiqueta: "Área metropolitana en EUA", multiplicador: 1.1 },
};

const PESOS_MODELO = {
  capitalHumano: 40,
  capitalSocial: 25,
  contextoGeografico: 35,
};

const PONDERACION_CONTACTOS = {
  altoNivelSocioeconomico: 3.0,
  contactoPuente: 2.0,
  mismoNivel: 1.0,
  vinculoFuertesFamilia: 0.5,
};

function calcularBoostIdiomas(numeroDeIdiomas) {
  if (numeroDeIdiomas === 1) return 0.6;
  if (numeroDeIdiomas === 2) return 1.0;
  return 1.0 + (numeroDeIdiomas - 2) * 0.12;
}

function calcularBoostExperiencia(aniosDeExperiencia) {
  return 1 + Math.log1p(aniosDeExperiencia) * 0.18;
}

export function calcularCapitalHumano(datos) {
  const boostIdiomas = calcularBoostIdiomas(datos.numeroDeIdiomas);
  const boostExperiencia = calcularBoostExperiencia(datos.aniosDeExperiencia);
  const multEducacion = NIVELES_EDUCATIVOS[datos.nivelEducativo].multiplicador;
  const multIngles = DOMINIO_INGLES[datos.dominioIngles].multiplicador;

  return boostIdiomas * multIngles * multEducacion * boostExperiencia * 100;
}

export function calcularCapitalSocial(contactos) {
  const puntosAltoNivel = contactos.altoNivelSocioeconomico * PONDERACION_CONTACTOS.altoNivelSocioeconomico;
  const puntosPuente = contactos.contactosPuente * PONDERACION_CONTACTOS.contactoPuente;
  const puntosMismoNivel = contactos.contactosMismoNivel * PONDERACION_CONTACTOS.mismoNivel;
  const puntosVinculo = contactos.vinculosFuertesFamilia * PONDERACION_CONTACTOS.vinculoFuertesFamilia;

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

export function calcularContextoGeografico(datos) {
  const multCiudad = TIPO_CIUDAD[datos.tipoCiudad].multiplicador;
  return multCiudad * datos.idhLocal * 130;
}

export function calcularIndiceTotal(indiceCapitalHumano, indiceCapitalSocial, indiceContextoGeografico, pesosModelo) {
  const sumaPesos = pesosModelo.capitalHumano + pesosModelo.capitalSocial + pesosModelo.contextoGeografico;

  const pesoNormalizadoCH = pesosModelo.capitalHumano / sumaPesos;
  const pesoNormalizadoCS = pesosModelo.capitalSocial / sumaPesos;
  const pesoNormalizadoGeo = pesosModelo.contextoGeografico / sumaPesos;

  return (
    indiceCapitalHumano * pesoNormalizadoCH +
    indiceCapitalSocial * pesoNormalizadoCS +
    indiceContextoGeografico * pesoNormalizadoGeo
  );
}

export function determinarNivelPotencial(indiceTotal) {
  if (indiceTotal < 25) return "No hay potencial de desarrollo";
  if (indiceTotal < 50) return "Potencial bajo";
  if (indiceTotal < 80) return "Potencial medio-bajo";
  if (indiceTotal < 110) return "Potencial medio";
  if (indiceTotal < 160) return "Potencial alto";

  return "Potencial estratosférico";
}

export function computeAllResults(datosPersonales, datosContactos, pesosModelo) {
  const indiceCapitalHumano = calcularCapitalHumano(datosPersonales);
  const resultadoCapitalSocial = calcularCapitalSocial(datosContactos);
  const indiceCapitalSocial = resultadoCapitalSocial.puntajeTotal * 0.8;
  const indiceContextoGeografico = calcularContextoGeografico(datosPersonales);
  const total = calcularIndiceTotal(indiceCapitalHumano, indiceCapitalSocial, indiceContextoGeografico, pesosModelo);

  return {
    capitalHumano: indiceCapitalHumano,
    capitalSocial: indiceCapitalSocial,
    contextoGeografico: indiceContextoGeografico,
    total,
    desgloseCS: resultadoCapitalSocial.desglose,
    nivel: determinarNivelPotencial(total)
  };
}
