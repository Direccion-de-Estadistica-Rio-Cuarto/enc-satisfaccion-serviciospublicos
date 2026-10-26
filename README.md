# Encuesta de Clima Laboral 2026 · Servicios Públicos (`sat-serviciospublicos-survey`)
**Gobierno de Río Cuarto · Secretaría de Gestión y Participación Ciudadana**  
**Dirección General de Estadísticas, Control de Calidad y Procesos · Código: `FO-SGC-05-IDI.11`**

Aplicación web en **HTML5** de relevamiento anónimo (Nivel 1: Captación) diseñada bajo arquitectura *Mobile-First*, con persistencia progresiva en `localStorage`, resiliencia ante cortes de conectividad y protocolo estricto de anonimato técnico y estadístico ($k\text{-anonimato con } n \ge 5$).

---

## 📁 Estructura de Archivos del Módulo

- **[`index.html`](index.html)**: Aplicación web interactiva del cuestionario oficial (`FO-SGC-05-IDI.11`), estructurada en **7 bloques temáticos** y **29 preguntas** (más subpreguntas matriciales y condicionales dinámicas), con navegación paso a paso o vista completa, modo claro/oscuro institucional y verificador metodológico integrado.
- **[`schema.js`](schema.js)**: Modelo estadístico congelado (Fase 1 y Fase 2): diccionario de datos, ponderadores por dimensión, fórmulas de normalización ($0-100\%$), cálculo de **Índice Global de Clima Laboral (IGCL)**, **Índice de Favorabilidad Neta (IFN)**, **eNPS**, **Alfa de Cronbach ($\alpha$)** y generador de simulación **Monte Carlo (100 casos)** (Fase 6).
- **[`apps-script.gs`](apps-script.gs)**: Backend serverless para Google Sheets / Apps Script (Fase 3) con desacoplamiento de identidad, sello temporal redondeado a la hora en punto, sanitización de texto libre y prevención de duplicados por UUID.
- **[`assets/logo.png`](assets/logo.png)** y **[`assets/sgypc.png`](assets/sgypc.png)**: Activos gráficos institucionales locales.

---

## 📐 Metodología y Fórmulas Implementadas (Fases 1, 2 y 3)

1. **Índice por Dimensión ($I_d$) e Índice Global de Clima Laboral ($\text{IGCL}$):**
   $$I_d = \left(\frac{\bar{X}_d - 1}{5 - 1}\right) \times 100$$
   - Ponderadores dimensionales: Ambiente Laboral ($30\%$), Motivación y Compromiso ($25\%$), Procesos, Recursos y Herramientas ($20\%$), Capacitación y Desarrollo ($15\%$), Valoración Global ($10\%$).
2. **Favorabilidad Neta ($\text{IFN}$):**
   $$\text{IFN} = \text{Top 2 Box } (4\text{ y }5) - \text{Bottom 2 Box } (1\text{ y }2)$$
3. **Employee Net Promoter Score ($\text{eNPS}$):**
   $$\text{eNPS} = \%\text{Promotores } (9 - 10) - \%\text{Detractores } (1 - 6)$$
4. **Fiabilidad Psicométrica (Alfa de Cronbach $\alpha$):**
   $$\alpha = \frac{K}{K - 1}\left(1 - \frac{\sum \sigma_i^2}{\sigma_T^2}\right)$$
5. **Protocolo de Anonimato Técnico (Fase 3.2):**
   - Generación de `UUID v4` aleatorio en cliente (`response_id`).
   - Sello temporal truncado a la hora en punto (`YYYY-MM-DDTHH:00:00-03:00`) para impedir trazabilidad por minuto exacto.
   - Sanitización automática de textos libres (enmascaramiento preventivo de secuencias numéricas de DNI o correos electrónicos).
