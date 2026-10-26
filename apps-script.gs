/**
 * ============================================================================
 * BACKEND SERVERLESS · ENCUESTA DE CLIMA LABORAL 2026 (FO-SGC-05-IDI.11)
 * Subsecretaría de Servicios Públicos · Gobierno de Río Cuarto
 * Dirección General de Estadísticas, Control de Calidad y Procesos
 *
 * Fase 3: Arquitectura de datos, Backend y seguridad del anonimato
 * - Sin registro de direcciones IP ni User-Agent identificatorio.
 * - Sello temporal redondeado a la hora en punto (evita trazabilidad por minuto).
 * - Prevención de inyección de fórmulas en Google Sheets (=, +, -, @).
 * - Sanitización de campos abiertos (250 máx. en "Otro", 2.000 máx. en abiertas)
 *   y control de duplicados por UUID v4.
 * ============================================================================
 */

const SHEET_RESP = "Respuestas_Clima_SP_2026";
const SHEET_RESUMEN = "Resumen_Operativo";
const SHEET_TOKENS = "Tokens_Participacion"; // Desacoplado de las respuestas (Fase 3.2.a)

const HEADERS = [
  "response_id",
  "timestamp_redondeado",
  "codigo_instrumento",
  "p1_area",
  "p2_modalidad",
  "p3_antiguedad",
  "p4_tarea",
  "p5_conformidad",
  "p6_motivos_disconformidad",
  "p6_otro",
  "p7_area_preferida",
  "p7_otro",
  "p7_porque",
  "p8", "p9", "p10", "p11", "p12", "p13", "p14",
  "p15", "p16", "p17", "p18", "p19", "p20",
  "p21",
  "p22_capacitaciones",
  "p22_otro",
  "p23a", "p23b", "p23c",
  "p23_1a", "p23_1a_otro",
  "p23_1b", "p23_1b_otro",
  "p23_1c", "p23_1c_otro",
  "p24a", "p24b", "p24c",
  "p25",
  "p25_1", "p25_1_otro",
  "p26",
  "p27_enps",
  "p27_1_motivo", "p27_1_otro",
  "p28_que_cambiaria",
  "p29_comentario_final",
  "igcl",
  "ifn",
  "enps_categoria"
];

/**
 * Menú institucional dentro de la planilla de Google Sheets
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("📊 Clima Laboral SGCyP")
    .addItem("1. Inicializar / Verificar hojas", "inicializarHojas")
    .addToUi();
}

/**
 * Inicializa las pestañas del libro de Google Sheets si no existen
 */
function inicializarHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Hoja principal de respuestas (49 columnas)
  let sheet = ss.getSheetByName(SHEET_RESP);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_RESP);
    sheet.appendRow(HEADERS);
    sheet
      .getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#009DE0")
      .setFontColor("#FFFFFF")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet
      .getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#009DE0")
      .setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }

  // 2. Hoja de resumen operativo con control de k-anonimato (n >= 5)
  let resumenSheet = ss.getSheetByName(SHEET_RESUMEN);
  if (!resumenSheet) {
    resumenSheet = ss.insertSheet(SHEET_RESUMEN);
    const filasResumen = [
      ["MONITOR DE CAPTACIÓN · ENCUESTA DE CLIMA LABORAL 2026 (FO-SGC-05-IDI.11)", "", "", ""],
      ["Subsecretaría de Servicios Públicos · Gobierno de Río Cuarto", "", "", ""],
      ["", "", "", ""],
      ["Indicador General", "Valor", "Criterio Metodológico", ""],
      ["Total de respuestas registradas (n)", `=MAX(0; COUNTA(${SHEET_RESP}!A2:A))`, "Unidad de análisis validada por UUID", ""],
      ["Promedio IGCL Global (0 a 100%)", `=IFERROR(ROUND(AVERAGE(${SHEET_RESP}!AU2:AU); 2); "Sin datos")`, "<50 Crítico | 50-69.9 Observación | >=70 Fortaleza", ""],
      ["Promedio IFN Global (-100 a +100)", `=IFERROR(ROUND(AVERAGE(${SHEET_RESP}!AV2:AV); 2); "Sin datos")`, "Top 2 Box (4-5) menos Bottom 2 Box (1-2)", ""],
      ["", "", "", ""],
      ["Distribución por Área (P1)", "Respuestas (n)", "Estado k-anonimato (n >= 5)", "IGCL Promedio del Área"],
      ["Administración", `=COUNTIF(${SHEET_RESP}!D2:D; "Administración")`, `=IF(B10>=5; "HABILITADO (n >= 5)"; "PROTEGIDO (n < 5)")`, `=IF(B10>=5; IFERROR(ROUND(AVERAGEIF(${SHEET_RESP}!D2:D; "Administración"; ${SHEET_RESP}!AU2:AU); 2); "-"); "Secreto estadístico (n < 5)")`],
      ["Higiene Urbana", `=COUNTIF(${SHEET_RESP}!D2:D; "Higiene Urbana")`, `=IF(B11>=5; "HABILITADO (n >= 5)"; "PROTEGIDO (n < 5)")`, `=IF(B11>=5; IFERROR(ROUND(AVERAGEIF(${SHEET_RESP}!D2:D; "Higiene Urbana"; ${SHEET_RESP}!AU2:AU); 2); "-"); "Secreto estadístico (n < 5)")`],
      ["Espacios Verdes", `=COUNTIF(${SHEET_RESP}!D2:D; "Espacios Verdes")`, `=IF(B12>=5; "HABILITADO (n >= 5)"; "PROTEGIDO (n < 5)")`, `=IF(B12>=5; IFERROR(ROUND(AVERAGEIF(${SHEET_RESP}!D2:D; "Espacios Verdes"; ${SHEET_RESP}!AU2:AU); 2); "-"); "Secreto estadístico (n < 5)")`],
      ["Mantenimiento (Taller Mecánico, Herrería, otros)", `=COUNTIF(${SHEET_RESP}!D2:D; "Mantenimiento (Taller Mecánico, Herrería, otros)")`, `=IF(B13>=5; "HABILITADO (n >= 5)"; "PROTEGIDO (n < 5)")`, `=IF(B13>=5; IFERROR(ROUND(AVERAGEIF(${SHEET_RESP}!D2:D; "Mantenimiento (Taller Mecánico, Herrería, otros)"; ${SHEET_RESP}!AU2:AU); 2); "-"); "Secreto estadístico (n < 5)")`],
      ["Servicios Descentralizados", `=COUNTIF(${SHEET_RESP}!D2:D; "Servicios Descentralizados")`, `=IF(B14>=5; "HABILITADO (n >= 5)"; "PROTEGIDO (n < 5)")`, `=IF(B14>=5; IFERROR(ROUND(AVERAGEIF(${SHEET_RESP}!D2:D; "Servicios Descentralizados"; ${SHEET_RESP}!AU2:AU); 2); "-"); "Secreto estadístico (n < 5)")`],
      ["Maestranza", `=COUNTIF(${SHEET_RESP}!D2:D; "Maestranza")`, `=IF(B15>=5; "HABILITADO (n >= 5)"; "PROTEGIDO (n < 5)")`, `=IF(B15>=5; IFERROR(ROUND(AVERAGEIF(${SHEET_RESP}!D2:D; "Maestranza"; ${SHEET_RESP}!AU2:AU); 2); "-"); "Secreto estadístico (n < 5)")`]
    ];
    resumenSheet.getRange(1, 1, filasResumen.length, 4).setValues(filasResumen);
    resumenSheet.getRange("A1:D1").setFontWeight("bold").setBackground("#009DE0").setFontColor("#FFFFFF");
    resumenSheet.getRange("A4:D4").setFontWeight("bold").setBackground("#E2E1DC");
    resumenSheet.getRange("A9:D9").setFontWeight("bold").setBackground("#E2E1DC");
    resumenSheet.autoResizeColumns(1, 4);
  }

  // 3. Hoja de tokens desacoplada (sin vínculo con response_id)
  let tokenSheet = ss.getSheetByName(SHEET_TOKENS);
  if (!tokenSheet) {
    tokenSheet = ss.insertSheet(SHEET_TOKENS);
    tokenSheet.appendRow(["token_hash", "usado", "bloque_fecha"]);
    tokenSheet
      .getRange(1, 1, 1, 3)
      .setFontWeight("bold")
      .setBackground("#14140F")
      .setFontColor("#FFFFFF");
    tokenSheet.setFrozenRows(1);
  }
}

/**
 * Sanitiza texto en servidor, previene inyección de fórmulas y aplica tope de caracteres
 */
function sanitizarServidor(str, maxLen) {
  if (str === null || str === undefined) return "";
  let limpio = String(str)
    .replace(/[<>]/g, "")
    .replace(/\b[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}\b/g, "[correo resguardado]")
    .replace(/\b\d{7,8}\b/g, "[DNI resguardado]")
    .trim();

  // Prevención de Formula Injection en Google Sheets
  if (/^[=+\-@]/.test(limpio)) {
    limpio = "'" + limpio;
  }

  if (maxLen && limpio.length > maxLen) {
    limpio = limpio.substring(0, maxLen);
  }
  return limpio;
}

/**
 * Sello temporal redondeado a la hora en punto (Fase 3.2.b: impide trazabilidad por minuto exacto)
 */
function obtenerSelloRedondeadoServidor() {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  return Utilities.formatDate(d, "America/Argentina/Cordoba", "yyyy-MM-dd'T'HH':00:00-03:00'");
}

/**
 * Endpoint POST: recibe una respuesta desde index.html y la inserta en Google Sheets
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    inicializarHojas();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_RESP);

    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = (e && e.parameter) || {};
      }
    } else {
      data = (e && e.parameter) || {};
    }

    const responseId = sanitizarServidor(data.response_id, 64) || Utilities.getUuid();

    // Control de respuestas duplicadas por UUID (Fase 3.3.a)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
      if (ids.indexOf(responseId) !== -1) {
        return ContentService.createTextOutput(
          JSON.stringify({ status: "duplicate", response_id: responseId })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }

    const fmtArr = (v) =>
      Array.isArray(v)
        ? v.map((item) => sanitizarServidor(item, 150)).join(" | ")
        : sanitizarServidor(v, 300);

    const valLikert = (v, permiteNA) => {
      const n = Number(v);
      if (n >= 1 && n <= 5) return n;
      if (permiteNA && String(v) === "No me corresponde / no lo uso") {
        return "No me corresponde / no lo uso";
      }
      return sanitizarServidor(v, 60);
    };

    const p23a = valLikert(data.p23a, true);
    const p23b = valLikert(data.p23b, true);
    const p23c = valLikert(data.p23c, true);

    const p24a = p23a === "No me corresponde / no lo uso" ? "No aplica" : sanitizarServidor(data.p24a, 60);
    const p24b = p23b === "No me corresponde / no lo uso" ? "No aplica" : sanitizarServidor(data.p24b, 60);
    const p24c = p23c === "No me corresponde / no lo uso" ? "No aplica" : sanitizarServidor(data.p24c, 60);

    // Fila ordenada según las 49 columnas oficiales de HEADERS
    const row = [
      responseId,
      obtenerSelloRedondeadoServidor(),
      "FO-SGC-05-IDI.11",
      sanitizarServidor(data.p1, 100),
      sanitizarServidor(data.p2, 60),
      sanitizarServidor(data.p3, 60),
      sanitizarServidor(data.p4, 80),
      sanitizarServidor(data.p5, 80),
      fmtArr(data.p6),
      sanitizarServidor(data.p6_otro, 250),    // Estándar 100-250 caracteres (Single-line)
      sanitizarServidor(data.p7, 100),
      sanitizarServidor(data.p7_otro, 250),    // Estándar 100-250 caracteres (Single-line)
      sanitizarServidor(data.p7_porque, 250),  // Estándar 100-250 caracteres (Single-line)
      valLikert(data.p8, false),
      valLikert(data.p9, false),
      valLikert(data.p10, false),
      valLikert(data.p11, false),
      valLikert(data.p12, false),
      valLikert(data.p13, false),
      valLikert(data.p14, false),
      valLikert(data.p15, false),
      valLikert(data.p16, false),
      valLikert(data.p17, false),
      valLikert(data.p18, false),
      valLikert(data.p19, false),
      valLikert(data.p20, false),
      valLikert(data.p21, false),
      fmtArr(data.p22),
      sanitizarServidor(data.p22_otro, 250),   // Estándar 100-250 caracteres (Single-line)
      p23a,
      p23b,
      p23c,
      fmtArr(data.p23_1a),
      sanitizarServidor(data.p23_1a_otro, 250),
      fmtArr(data.p23_1b),
      sanitizarServidor(data.p23_1b_otro, 250),
      fmtArr(data.p23_1c),
      sanitizarServidor(data.p23_1c_otro, 250),
      p24a,
      p24b,
      p24c,
      valLikert(data.p25, false),
      fmtArr(data.p25_1),
      sanitizarServidor(data.p25_1_otro, 250),
      valLikert(data.p26, false),
      Math.max(1, Math.min(10, Number(data.p27) || 1)),
      sanitizarServidor(data.p27_1, 120),
      sanitizarServidor(data.p27_1_otro, 250),
      sanitizarServidor(data.p28, 2000),       // Estándar 1.000-2.000 caracteres (Textarea)
      sanitizarServidor(data.p29, 2000),       // Estándar 1.000-2.000 caracteres (Textarea)
      Number(data.igcl) || "",
      Number(data.ifn) || "",
      sanitizarServidor(data.enps_categoria, 40)
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", response_id: responseId })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Endpoint GET: devuelve las respuestas registradas para el Monitor (sat-serviciospublicos-dash)
 */
function doGet() {
  inicializarHojas();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_RESP);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) {
    return ContentService.createTextOutput(
      JSON.stringify({ total: 0, respuestas: [] })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  const headers = rows[0];
  const data = rows.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = r[i];
    });
    return obj;
  });
  return ContentService.createTextOutput(
    JSON.stringify({ total: data.length, respuestas: data })
  ).setMimeType(ContentService.MimeType.JSON);
}
