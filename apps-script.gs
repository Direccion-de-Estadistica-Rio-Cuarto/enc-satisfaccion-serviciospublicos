/**
 * ============================================================================
 * BACKEND SERVERLESS · ENCUESTA DE CLIMA LABORAL 2026 (FO-SGC-05-IDI.11)
 * Subsecretaría de Servicios Públicos · Municipalidad de Río Cuarto
 * Dirección General de Estadísticas, Control de Calidad y Procesos
 *
 * Fase 3: Arquitectura de datos, Backend y seguridad del anonimato
 * - Sin registro de direcciones IP ni User-Agent identificatorio.
 * - Sello temporal redondeado a la hora en punto (evita trazabilidad por minuto).
 * - Sanitización de campos abiertos y control de duplicados por UUID.
 * ============================================================================
 */

const SHEET_RESP = "Respuestas_Clima_SP_2026";
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

function inicializarHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_RESP);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_RESP);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#009DE0").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
  let tokenSheet = ss.getSheetByName(SHEET_TOKENS);
  if (!tokenSheet) {
    tokenSheet = ss.insertSheet(SHEET_TOKENS);
    tokenSheet.appendRow(["token_hash", "usado", "bloque_fecha"]);
    tokenSheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#14171A").setFontColor("#FFFFFF");
    tokenSheet.setFrozenRows(1);
  }
}

function sanitizarServidor(str) {
  if (!str) return "";
  return String(str)
    .replace(/[<>]/g, "")
    .replace(/\b[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}\b/g, "[correo resguardado]")
    .replace(/\b\d{7,8}\b/g, "[DNI resguardado]")
    .trim();
}

function obtenerSelloRedondeadoServidor() {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  return Utilities.formatDate(d, "America/Argentina/Cordoba", "yyyy-MM-dd'T'HH':00:00-03:00'");
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    inicializarHojas();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_RESP);

    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    const responseId = sanitizarServidor(data.response_id) || Utilities.getUuid();

    // Control de respuestas duplicadas por UUID (Fase 3.3.a)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
      if (ids.indexOf(responseId) !== -1) {
        return ContentService.createTextOutput(JSON.stringify({ status: "duplicate", response_id: responseId }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    const fmtArr = (v) => Array.isArray(v) ? v.join(" | ") : sanitizarServidor(v);
    const valLikert = (v) => {
      const n = Number(v);
      return (n >= 1 && n <= 5) ? n : sanitizarServidor(v);
    };

    const row = [
      responseId,
      obtenerSelloRedondeadoServidor(),
      "FO-SGC-05-IDI.11",
      sanitizarServidor(data.p1),
      sanitizarServidor(data.p2),
      sanitizarServidor(data.p3),
      sanitizarServidor(data.p4),
      sanitizarServidor(data.p5),
      fmtArr(data.p6),
      sanitizarServidor(data.p6_otro),
      sanitizarServidor(data.p7),
      sanitizarServidor(data.p7_otro),
      sanitizarServidor(data.p7_porque),
      valLikert(data.p8), valLikert(data.p9), valLikert(data.p10), valLikert(data.p11),
      valLikert(data.p12), valLikert(data.p13), valLikert(data.p14),
      valLikert(data.p15), valLikert(data.p16), valLikert(data.p17), valLikert(data.p18),
      valLikert(data.p19), valLikert(data.p20),
      valLikert(data.p21),
      fmtArr(data.p22),
      sanitizarServidor(data.p22_otro),
      valLikert(data.p23a), valLikert(data.p23b), valLikert(data.p23c),
      fmtArr(data.p23_1a), sanitizarServidor(data.p23_1a_otro),
      fmtArr(data.p23_1b), sanitizarServidor(data.p23_1b_otro),
      fmtArr(data.p23_1c), sanitizarServidor(data.p23_1c_otro),
      sanitizarServidor(data.p24a), sanitizarServidor(data.p24b), sanitizarServidor(data.p24c),
      valLikert(data.p25),
      fmtArr(data.p25_1), sanitizarServidor(data.p25_1_otro),
      valLikert(data.p26),
      Math.max(1, Math.min(10, Number(data.p27) || 1)),
      sanitizarServidor(data.p27_1), sanitizarServidor(data.p27_1_otro),
      sanitizarServidor(data.p28),
      sanitizarServidor(data.p29),
      Number(data.igcl) || "",
      Number(data.ifn) || "",
      sanitizarServidor(data.enps_categoria)
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ status: "ok", response_id: responseId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  inicializarHojas();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_RESP);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ total: 0, respuestas: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  const headers = rows[0];
  const data = rows.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = r[i]; });
    return obj;
  });
  return ContentService.createTextOutput(JSON.stringify({ total: data.length, respuestas: data }))
    .setMimeType(ContentService.MimeType.JSON);
}
