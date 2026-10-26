/**
 * ============================================================================
 * DICCIONARIO DE DATOS, MODELO ESTADÍSTICO Y FÓRMULAS PSICOMÉTRICAS (FASE 1 y 2)
 * Proyecto: Encuesta de Clima Laboral 2026 · Subsecretaría de Servicios Públicos
 * Código Documental: FO-SGC-05-IDI.11 · Gobierno de Río Cuarto
 * Dirección General de Estadísticas, Control de Calidad y Procesos
 * ============================================================================
 */

window.CLIMA_SP_SCHEMA = {
  meta: {
    codigo_documento: "FO-SGC-05-IDI.11",
    version: "1.0",
    anio: 2026,
    dependencia: "Subsecretaría de Servicios Públicos",
    organismo: "Gobierno de Río Cuarto",
    direccion: "Dirección General de Estadísticas, Control de Calidad y Procesos",
    k_anonimato_min: 5,
    confianza_z: 1.96
  },

  // Catálogo oficial de opciones cerradas (Bloque 1 y condicionales)
  catalogos: {
    areas: [
      "Administración",
      "Higiene Urbana",
      "Espacios Verdes",
      "Mantenimiento (Taller Mecánico, Herrería, otros)",
      "Servicios Descentralizados",
      "Maestranza"
    ],
    modalidades: [
      "Planta permanente",
      "Contratado",
      "Cooperativa"
    ],
    antiguedad: [
      "Menos de 1 año",
      "1 a 5 años",
      "6 a 10 años",
      "Más de 10 años"
    ],
    tareas: [
      "Operario / Chofer",
      "Administrativo",
      "Técnico / Profesional",
      "Jerárquico",
      "Maestranza"
    ],
    conformidad_p5: [
      "Sí, conforme con ambas",
      "No con el área",
      "No con las tareas",
      "No con ninguna de las dos"
    ],
    motivos_disconformidad: [
      "Trato y clima con compañeros/as",
      "Relación con la jefatura",
      "Tareas poco claras, organización y procesos",
      "Carga de trabajo",
      "Falta o mal estado de herramientas y máquinas",
      "Falta o mal estado de vehículos",
      "Ropa de trabajo y elementos de protección personal",
      "Condiciones de seguridad e higiene",
      "Condiciones del convenio",
      "Capacitación y oportunidades de desarrollo",
      "Reconocimiento",
      "Otro"
    ],
    capacitaciones_p22: [
      "Herramientas informáticas (Excel, Word, Google Sheets, etc.)",
      "Procesos administrativos y gestión de servicios públicos",
      "Normativa legal y reglamentaria",
      "Operador y manejo de equipos pesados",
      "RCP – Primeros auxilios",
      "Seguridad e higiene. Prevención de riesgos laborales",
      "Liderazgo y gestión de equipos",
      "Talleres de fortalecimiento personal y trabajo colaborativo",
      "Comunicación productiva en equipos",
      "Educación emocional en contextos de alta exigencia",
      "Otro"
    ],
    items_p23_p24: [
      { id: "a", codigo: "p23a", label: "a) Herramientas y máquinas o vehículos", corto: "Herramientas, máquinas o vehículos" },
      { id: "b", codigo: "p23b", label: "b) Insumos y materiales", corto: "Insumos y materiales" },
      { id: "c", codigo: "p23c", label: "c) Ropa de trabajo y elementos de protección personal", corto: "Ropa de trabajo y elementos de protección personal" }
    ],
    fallas_p23_1: [
      "No hay o faltan",
      "Llegan tarde",
      "Están en mal estado",
      "No son los adecuados para la tarea",
      "No sé a quién pedirlos o cómo hacerlo",
      "Hago el pedido y no me responden",
      "Otro"
    ],
    proveedores_p24: [
      "Municipalidad",
      "Cooperativa",
      "Ambos",
      "Lo resuelvo yo mismo/a",
      "No sé"
    ],
    fallas_procedimientos_p25_1: [
      "No están escritos o no los conozco",
      "Son confusos o difíciles de cumplir",
      "Cambian seguido y no se avisa",
      "Cada jefe o compañero los aplica distinto",
      "No se controla que se cumplan",
      "Algunos los respetan y otros no",
      "Tienen demasiados pasos o trámites que demoran el trabajo",
      "No recibí capacitación sobre cómo hacerlo",
      "Otro"
    ]
  },

  // Dimensiones psicométricas y ponderadores para el IGCL (Fase 1.4 y Fase 2.2)
  dimensiones: {
    ambiente_laboral: {
      id: "ambiente_laboral",
      bloque: 2,
      nombre: "Ambiente laboral",
      peso_igcl: 0.30,
      escala_tipo: "conformidad_1_5",
      items: [
        { codigo: "p8", numero: "8", texto: "En general, ¿cómo me siento con el ambiente laboral?", sentido: "positiva", peso: 1 },
        { codigo: "p9", numero: "9", texto: "¿Entiendo bien cuáles son mis tareas y responsabilidades?", sentido: "positiva", peso: 1 },
        { codigo: "p10", numero: "10", texto: "¿Tengo la información, las herramientas y los materiales que necesito para hacer mi trabajo?", sentido: "positiva", peso: 1 },
        { codigo: "p11", numero: "11", texto: "¿Recibo apoyo, guía y buen trato de mi jefe o jefa directa?", sentido: "positiva", peso: 1 },
        { codigo: "p12", numero: "12", texto: "¿Me llevo bien y trabajo en equipo con mis compañeros/as?", sentido: "positiva", peso: 1 },
        { codigo: "p13", numero: "13", texto: "¿Las condiciones de seguridad e higiene en mi lugar de trabajo son adecuadas?", sentido: "positiva", peso: 1 },
        { codigo: "p14", numero: "14", texto: "¿La comunicación con mi jefe o jefa es clara y suficiente?", sentido: "positiva", peso: 1 }
      ]
    },
    motivacion_compromiso: {
      id: "motivacion_compromiso",
      bloque: 3,
      nombre: "Motivación y compromiso",
      peso_igcl: 0.25,
      escala_tipo: "acuerdo_1_5",
      items: [
        { codigo: "p15", numero: "15", texto: "Conozco mis derechos laborales.", sentido: "positiva", peso: 1 },
        { codigo: "p16", numero: "16", texto: "Conozco mis deberes y obligaciones en el trabajo.", sentido: "positiva", peso: 1 },
        { codigo: "p17", numero: "17", texto: "Estoy comprometido/a con las metas y objetivos de mi área.", sentido: "positiva", peso: 1 },
        { codigo: "p18", numero: "18", texto: "Uso bien los recursos disponibles (tiempo, herramientas).", sentido: "positiva", peso: 1 },
        { codigo: "p19", numero: "19", texto: "Estoy motivado/a para realizar mis tareas diarias.", sentido: "positiva", peso: 1 },
        { codigo: "p20", numero: "20", texto: "Me siento valorado/a por mi aporte al equipo.", sentido: "positiva", peso: 1 }
      ]
    },
    capacitacion_desarrollo: {
      id: "capacitacion_desarrollo",
      bloque: 4,
      nombre: "Capacitación y desarrollo",
      peso_igcl: 0.15,
      escala_tipo: "satisfaccion_1_5",
      items: [
        { codigo: "p21", numero: "21", texto: "¿Qué tan satisfecho está con las oportunidades de capacitación relacionadas con su tarea?", sentido: "positiva", peso: 1 }
      ]
    },
    procesos_recursos: {
      id: "procesos_recursos",
      bloque: 5,
      nombre: "Procesos, recursos y herramientas",
      peso_igcl: 0.20,
      escala_tipo: "acuerdo_1_5_na",
      items: [
        { codigo: "p23a", numero: "23a", texto: "Recibo en tiempo y forma, y en buen estado: a) Herramientas y máquinas o vehículos", sentido: "positiva", peso: 1, admite_na: true },
        { codigo: "p23b", numero: "23b", texto: "Recibo en tiempo y forma, y en buen estado: b) Insumos y materiales", sentido: "positiva", peso: 1, admite_na: true },
        { codigo: "p23c", numero: "23c", texto: "Recibo en tiempo y forma, y en buen estado: c) Ropa de trabajo y elementos de protección personal", sentido: "positiva", peso: 1, admite_na: true },
        { codigo: "p25", numero: "25", texto: "Los procedimientos de trabajo de mi sector están claros y se respetan.", sentido: "positiva", peso: 1, admite_na: false }
      ]
    },
    valoracion_global: {
      id: "valoracion_global",
      bloque: 6,
      nombre: "Valoración global",
      peso_igcl: 0.10,
      escala_tipo: "satisfaccion_1_5",
      items: [
        { codigo: "p26", numero: "26", texto: "En general, ¿qué tan satisfecho/a está con su lugar de trabajo hoy?", sentido: "positiva", peso: 1 }
      ]
    }
  },

  // Umbrales semafóricos de gestión (Fase 2.6)
  umbrales: {
    critico_max: 49.99,     // < 50% Alerta Roja (requiere intervención inmediata)
    observacion_max: 69.99, // 50% a 69.9% Amarillo (oportunidad de mejora)
    fortaleza_min: 70.0     // >= 70% Verde (estándar satisfactorio/óptimo)
  }
};

/**
 * Funciones Matemáticas y Estadísticas Oficiales (Fase 2 y Fase 3)
 */
window.CLIMA_SP_STATS = {
  /**
   * Genera un UUID v4 criptográficamente aleatorio (Fase 3.2.b)
   */
  generarUUID: function () {
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  /**
   * Genera sello temporal redondeado a la hora en punto (Fase 3.2.b)
   * Evita trazabilidad por minuto/segundo exacto.
   */
  obtenerSelloTemporalRedondeado: function (fecha = new Date()) {
    const d = new Date(fecha);
    d.setMinutes(0, 0, 0);
    const pad = (n) => String(n).padStart(2, "0");
    const tzOffset = -d.getTimezoneOffset();
    const sign = tzOffset >= 0 ? "+" : "-";
    const tzHours = pad(Math.floor(Math.abs(tzOffset) / 60));
    const tzMins = pad(Math.abs(tzOffset) % 60);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:00:00${sign}${tzHours}:${tzMins}`;
  },

  /**
   * Sanitiza texto libre y previene ingreso accidental de DNI / Email / HTML (Fase 3.3.a)
   */
  sanitizarTextoLibre: function (texto) {
    if (!texto || typeof texto !== "string") return "";
    return texto
      .replace(/[<>]/g, "") // Remueve tags HTML
      .replace(/\b[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}\b/g, "[correo resguardado]") // Anonimiza emails
      .replace(/\b\d{7,8}\b/g, "[DNI resguardado]") // Anonimiza posibles DNI de 7-8 dígitos seguidos
      .trim();
  },

  /**
   * Normalización de puntaje Likert (1 a 5) a escala 0 - 100% (Fase 2.2)
   * I_d = ((X_d - 1) / (5 - 1)) * 100
   */
  normalizarLikert: function (valor) {
    const num = Number(valor);
    if (!Number.isFinite(num) || num < 1 || num > 5) return null;
    return Number((((num - 1) / 4) * 100).toFixed(2));
  },

  /**
   * Calcula los índices por dimensión y el Índice Global de Clima Laboral (IGCL) para una respuesta
   */
  calcularIndicesRespuesta: function (resp) {
    const dims = window.CLIMA_SP_SCHEMA.dimensiones;
    const resultado = {
      dimensiones: {},
      igcl: null,
      promedio_likert_global: null,
      favorabilidad_top2box_pct: null,
      desfavorabilidad_bottom2box_pct: null,
      ifn: null,
      enps_categoria: null
    };

    let sumaPonderada = 0;
    let pesoTotalActivo = 0;
    const todosLosLikertValidos = [];

    Object.keys(dims).forEach((key) => {
      const dim = dims[key];
      const valores = [];
      dim.items.forEach((item) => {
        const v = Number(resp[item.codigo]);
        if (Number.isFinite(v) && v >= 1 && v <= 5) {
          valores.push(v);
          todosLosLikertValidos.push(v);
        }
      });

      if (valores.length > 0) {
        const media = valores.reduce((a, b) => a + b, 0) / valores.length;
        const indiceNorm = ((media - 1) / 4) * 100;
        resultado.dimensiones[key] = {
          media: Number(media.toFixed(2)),
          indice_0_100: Number(indiceNorm.toFixed(1)),
          items_respondidos: valores.length
        };
        sumaPonderada += indiceNorm * dim.peso_igcl;
        pesoTotalActivo += dim.peso_igcl;
      } else {
        resultado.dimensiones[key] = { media: null, indice_0_100: null, items_respondidos: 0 };
      }
    });

    if (pesoTotalActivo > 0) {
      resultado.igcl = Number((sumaPonderada / pesoTotalActivo).toFixed(1));
    }

    if (todosLosLikertValidos.length > 0) {
      const n = todosLosLikertValidos.length;
      const suma = todosLosLikertValidos.reduce((a, b) => a + b, 0);
      resultado.promedio_likert_global = Number((suma / n).toFixed(2));
      const top2 = todosLosLikertValidos.filter((v) => v >= 4).length;
      const bot2 = todosLosLikertValidos.filter((v) => v <= 2).length;
      const top2Pct = (top2 / n) * 100;
      const bot2Pct = (bot2 / n) * 100;
      resultado.favorabilidad_top2box_pct = Number(top2Pct.toFixed(1));
      resultado.desfavorabilidad_bottom2box_pct = Number(bot2Pct.toFixed(1));
      resultado.ifn = Number((top2Pct - bot2Pct).toFixed(1));
    }

    const p27 = Number(resp.p27);
    if (Number.isFinite(p27) && p27 >= 1 && p27 <= 10) {
      if (p27 >= 9) resultado.enps_categoria = "Promotor";
      else if (p27 >= 7) resultado.enps_categoria = "Pasivo";
      else resultado.enps_categoria = "Detractor";
    }

    return resultado;
  },

  /**
   * Cálculo de Alfa de Cronbach (α) para validar la fiabilidad psicométrica del instrumento (Fase 2.5.b)
   * α = (K / (K - 1)) * (1 - (Σ σ_i^2 / σ_T^2))
   */
  calcularAlfaCronbach: function (loteRespuestas, codigosItems = ["p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "p19", "p20", "p21", "p25", "p26"]) {
    const K = codigosItems.length;
    if (!Array.isArray(loteRespuestas) || loteRespuestas.length < 2 || K < 2) {
      return { alfa: null, n_casos_completos: 0, k_items: K, interpretacion: "Muestra insuficiente (n < 2)" };
    }

    // Filtrar filas que tengan respuesta numérica válida (1 a 5) en los K ítems
    const matriz = loteRespuestas
      .map((r) => codigosItems.map((c) => Number(r[c])))
      .filter((fila) => fila.every((v) => Number.isFinite(v) && v >= 1 && v <= 5));

    const n = matriz.length;
    if (n < 2) {
      return { alfa: null, n_casos_completos: n, k_items: K, interpretacion: "Muestra insuficiente" };
    }

    const varianzaPoblacional = (arr) => {
      const media = arr.reduce((a, b) => a + b, 0) / arr.length;
      return arr.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / arr.length;
    };

    let sumaVarianzasItems = 0;
    for (let j = 0; j < K; j++) {
      const col = matriz.map((fila) => fila[j]);
      sumaVarianzasItems += varianzaPoblacional(col);
    }

    const puntajesTotales = matriz.map((fila) => fila.reduce((a, b) => a + b, 0));
    const varianzaTotal = varianzaPoblacional(puntajesTotales);

    if (varianzaTotal === 0) {
      return { alfa: 1.0, n_casos_completos: n, k_items: K, interpretacion: "Varianza total nula" };
    }

    const alfa = (K / (K - 1)) * (1 - sumaVarianzasItems / varianzaTotal);
    const alfaRedondeado = Number(alfa.toFixed(3));

    let interpretacion = "Excelente consistencia interna";
    if (alfaRedondeado < 0.6) interpretacion = "Consistencia baja";
    else if (alfaRedondeado < 0.7) interpretacion = "Consistencia aceptable (exploratoria)";
    else if (alfaRedondeado < 0.8) interpretacion = "Consistencia buena";
    else if (alfaRedondeado < 0.9) interpretacion = "Consistencia muy buena";

    return {
      alfa: alfaRedondeado,
      n_casos_completos: n,
      k_items: K,
      suma_varianzas_items: Number(sumaVarianzasItems.toFixed(3)),
      varianza_total: Number(varianzaTotal.toFixed(3)),
      interpretacion
    };
  },

  /**
   * Margen de Error Muestral (e) para poblaciones finitas al 95% de confianza (Fase 2.1)
   */
  calcularMargenErrorFinito: function (n, N) {
    if (!n || !N || n <= 0 || N <= 1) return null;
    if (n >= N) return 0;
    const Z = 1.96;
    const p = 0.5;
    const q = 0.5;
    const e = Z * Math.sqrt((p * q) / n) * Math.sqrt((N - n) / (N - 1));
    return Number((e * 100).toFixed(2));
  },

  /**
   * Generador de Lote Sintético de Prueba (Fase 6.1: Monte Carlo / Piloto de 100 casos)
   */
  generarLoteSinteticoMonteCarlo: function (cantidad = 100) {
    const cat = window.CLIMA_SP_SCHEMA.catalogos;
    const lote = [];
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const pickN = (arr, maxN) => {
      const copia = [...arr].filter((x) => x !== "Otro");
      const k = Math.max(1, Math.floor(Math.random() * maxN) + 1);
      const sel = [];
      while (sel.length < k && copia.length > 0) {
        const idx = Math.floor(Math.random() * copia.length);
        sel.push(copia.splice(idx, 1)[0]);
      }
      return sel;
    };

    const limitarLikert = (v) => Math.max(1, Math.min(5, Math.round(v)));

    for (let i = 0; i < cantidad; i++) {
      // Factor latente del agente (para que el Alfa de Cronbach sea realista y consistente ~0.85)
      const latente = 1.8 + Math.random() * 3.0; // entre 1.8 y 4.8
      const genLikert = (sesgo = 0) => limitarLikert(latente + sesgo + (Math.random() - 0.5) * 1.4);

      const area = pick(cat.areas);
      const modalidad = pick(cat.modalidades);
      const antiguedad = pick(cat.antiguedad);
      const tarea = pick(cat.tareas.filter((t) =>
        t !== area && !(area === "Administración" && t === "Administrativo")
      ));

      let p5 = "Sí, conforme con ambas";
      if (latente < 2.6) p5 = pick(["No con el área", "No con las tareas", "No con ninguna de las dos"]);
      else if (latente < 3.3 && Math.random() < 0.35) p5 = pick(["No con las tareas", "No con el área"]);

      const p6 = p5 !== "Sí, conforme con ambas" ? pickN(cat.motivos_disconformidad, 3) : [];
      const requiereP7 = p5 === "No con el área" || p5 === "No con ninguna de las dos";
      const areasAlt = cat.areas.filter((a) => a !== area);
      const p7 = requiereP7 ? pick(areasAlt) : "";
      const p7_porque = requiereP7 ? "Considero que mis conocimientos técnicos y experiencia se adaptan mejor a ese sector." : "";

      const p8 = genLikert(0.1);
      const p9 = genLikert(0.3);
      const p10 = genLikert(-0.3);
      const p11 = genLikert(0.2);
      const p12 = genLikert(0.4);
      const p13 = genLikert(-0.2);
      const p14 = genLikert(0.1);

      const p15 = genLikert(0.3);
      const p16 = genLikert(0.5);
      const p17 = genLikert(0.4);
      const p18 = genLikert(0.3);
      const p19 = genLikert(0.1);
      const p20 = genLikert(-0.1);

      const p21 = genLikert(-0.2);
      const p22 = pickN(cat.capacitaciones_p22, 3);

      const p23a = Math.random() < 0.08 ? "No me corresponde / no lo uso" : String(genLikert(-0.3));
      const p23b = Math.random() < 0.05 ? "No me corresponde / no lo uso" : String(genLikert(-0.2));
      const p23c = String(genLikert(-0.1));

      const p23_1a = (p23a === "1" || p23a === "2") ? pickN(cat.fallas_p23_1, 2) : [];
      const p23_1b = (p23b === "1" || p23b === "2") ? pickN(cat.fallas_p23_1, 2) : [];
      const p23_1c = (p23c === "1" || p23c === "2") ? pickN(cat.fallas_p23_1, 2) : [];

      const provDefault = modalidad === "Cooperativa" ? "Cooperativa" : "Municipalidad";
      const provPermitidos = modalidad === "Cooperativa"
        ? cat.proveedores_p24
        : cat.proveedores_p24.filter((p) => p !== "Cooperativa" && p !== "Ambos");
      const p24a = p23a === "No me corresponde / no lo uso" ? "No aplica" : (Math.random() < 0.75 ? provDefault : pick(provPermitidos));
      const p24b = p23b === "No me corresponde / no lo uso" ? "No aplica" : (Math.random() < 0.75 ? provDefault : pick(provPermitidos));
      const p24c = p23c === "No me corresponde / no lo uso" ? "No aplica" : (Math.random() < 0.75 ? provDefault : pick(provPermitidos));

      const p25 = genLikert(-0.1);
      const p25_1 = p25 <= 2 ? pickN(cat.fallas_procedimientos_p25_1, 2) : [];

      const p26 = genLikert(0.1);
      const p27 = Math.max(1, Math.min(10, Math.round((latente / 5) * 10 + (Math.random() - 0.5) * 2)));

      const requiereP27_1 = p26 <= 3 || p27 <= 6;
      const p27_1 = requiereP27_1 ? pick(cat.motivos_disconformidad.filter((x) => x !== "Otro")) : "";
      const p28 = requiereP27_1 ? "Mejorar los tiempos de reposición de herramientas y clarificar los procedimientos de pedido." : "";
      const p29 = Math.random() < 0.45 ? "Muy buen compañerismo en la cuadrilla; sería importante renovar equipos de protección antes del invierno." : "";

      const fechaSim = new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 3600 * 1000));

      const registroBase = {
        response_id: this.generarUUID(),
        timestamp_redondeado: this.obtenerSelloTemporalRedondeado(fechaSim),
        codigo_instrumento: "FO-SGC-05-IDI.11",
        es_simulacion_montecarlo: true,
        p1: area,
        p2: modalidad,
        p3: antiguedad,
        p4: tarea,
        p5: p5,
        p6: p6,
        p6_otro: "",
        p7: p7,
        p7_otro: "",
        p7_porque: p7_porque,
        p8, p9, p10, p11, p12, p13, p14,
        p15, p16, p17, p18, p19, p20,
        p21,
        p22: p22,
        p22_otro: "",
        p23a, p23b, p23c,
        p23_1a, p23_1a_otro: "",
        p23_1b, p23_1b_otro: "",
        p23_1c, p23_1c_otro: "",
        p24a, p24b, p24c,
        p25,
        p25_1, p25_1_otro: "",
        p26,
        p27,
        p27_1, p27_1_otro: "",
        p28,
        p29
      };

      const kpis = this.calcularIndicesRespuesta(registroBase);
      registroBase.igcl = kpis.igcl;
      registroBase.enps_categoria = kpis.enps_categoria;
      registroBase.ifn = kpis.ifn;
      registroBase.indices_dimensiones = kpis.dimensiones;

      lote.push(registroBase);
    }

    return lote;
  }
};
