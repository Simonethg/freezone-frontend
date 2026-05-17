export const COPY = {
  brand: {
    name: "FreeZone",
    fullName: "FreeZone Enterprise Matrix",
    tagline: "Operational behavior into programmable trust.",
  },
  nav: {
    dashboard: "Tablero",
    demo: "Demostración",
    upload: "Cargar documento",
    payments: "Pagos",
    verify: "Verificar",
    skipToMain: "Saltar al contenido principal",
  },
  status: {
    pending: "Pendiente",
    blocked: "Bloqueado",
    blockedFem: "Bloqueada",
    active: "Activa",
    suspended: "Suspendida",
    initiated: "Iniciado",
    processing: "En proceso",
    completed: "Completado",
    failed: "Fallido",
    verified: "Verificado",
    rejected: "Rechazado",
    expired: "Vencido",
    ok: "API operativa",
    degraded: "API degradada",
    unavailable: "API no disponible",
  },
  docType: {
    certificate_of_origin: "Certificado de origen",
    quality_report: "Reporte de calidad",
    purchase_order: "Orden de compra",
    invoice: "Factura",
    packing_list: "Packing list",
    other: "Otro documento",
  },
  priority: {
    critical: "Crítica",
    high: "Alta",
    medium: "Media",
    low: "Baja",
  },
  companyType: {
    supplier: "Proveedor",
    manufacturer: "Elaboradora",
    distributor: "Distribuidora",
    bank: "Banco",
  },
  narratives: {
    "Supplier is blocked until critical documentation is verified.":
      "está bloqueado hasta verificar la documentación crítica.",
    "Supplier trust score below minimum threshold.":
      "Su puntaje de confianza está por debajo del umbral mínimo de cumplimiento.",
    "All documents verified.":
      "Toda la documentación requerida está verificada.",
    "Payment ready for execution.":
      "El pago está listo para ejecución.",
    "Original document verified on Avalanche Fuji.":
      "Documento original verificado en Avalanche Fuji.",
  },
  channel: { title: "Corredor comercial" },
  kpis: {
    documentsVerified: "Documentos verificados",
    documentsPending: "Documentos pendientes",
    companiesBlocked: "Empresas bloqueadas",
    paymentsPending: "Pagos pendientes",
  },
  demoSteps: [
    "Tablero inicial",
    "Cargar documento legal",
    "Documento anclado en Avalanche",
    "Calcular puntaje de reputación",
    "Refrescar tablero",
    "Habilitar pago",
    "Iniciar pago",
    "Pago completado",
  ],
  landing: {
    subhead:
      "Coordine procesos transfronterizos, calcule reputación operacional, genere evidencia auditable y ancle pruebas verificables en Avalanche.",
    ctaDashboard: "Abrir tablero",
    ctaDemo: "Ejecutar demostración Argentina → México",
    features: {
      evidence: {
        title: "Evidencia verificable",
        description:
          "Ancele hashes de documentos en Avalanche Fuji y verifique la integridad sin exponer contenido sensible.",
      },
      intelligence: {
        title: "Inteligencia operacional",
        description:
          "Calcule puntajes de cumplimiento, riesgo y confianza a partir del comportamiento documental real.",
      },
      settlement: {
        title: "Liquidación instantánea",
        description:
          "Libere pagos transfronterizos cuando la documentación crítica y la reputación operacional lo permitan.",
      },
    },
    howItWorks: "Cómo funciona",
    verifyLink: "Verificar documento por hash",
    disclosure:
      "Las transacciones con activos digitales involucran riesgo operacional, regulatorio y de liquidación. FreeZone almacena pruebas de verificación y hashes; los documentos corporativos sensibles no se almacenan en cadena.",
  },
  dashboard: {
    title: "Tablero operacional",
    stageBefore: "Estado inicial",
    stageAfter: "Estado final",
    avalancheBadge: "Avalanche Fuji",
    companiesSection: "Empresas del corredor",
    documentsSection: "Documentos requeridos",
    paymentSection: "Pago pendiente",
    empty: "No hay datos disponibles en este momento.",
    retry: "Reintentar carga",
  },
  demo: {
    title: "Demostración Argentina → México",
    liveMode: "Ejecución en vivo",
    finalMode: "Mostrar estado final",
    runFull: "Ejecutar flujo completo",
    retry: "Reintentar",
    viewDashboard: "Ver estado consolidado",
    results: "Resultados finales",
  },
  upload: {
    title: "Carga manual de documento",
    labelField: "Etiqueta del documento",
    companyField: "Empresa",
    docTypeField: "Tipo de documento",
    fileField: "Archivo del documento",
    submit: "Cargar y anclar documento",
    success: "Documento cargado y anclado correctamente.",
    maxSize: "El archivo no debe superar 10 MB.",
    invalidType: "Formato no permitido. Use PDF, JPG o PNG.",
  },
  payments: {
    title: "Pagos",
    paymentId: "Identificador del pago",
    submit: "Iniciar pago",
    statusTitle: "Estado del pago",
    polling: "Consultando estado…",
  },
  verify: {
    title: "Verificar documento",
    hashLabel: "Hash del documento",
    hashPlaceholder: "0x… o identificador del documento",
    submit: "Verificar",
    footer:
      "Pegue el hash del documento para verificar su integridad y anclaje en Avalanche.",
    valid: "Documento verificado",
    invalid:
      "No se encontró ningún documento anclado con ese hash en FreeZone.",
    disclosure:
      "FreeZone almacena únicamente el hash del documento. El contenido del documento nunca es almacenado en cadena.",
    network: "Avalanche Fuji",
  },
  common: {
    notAvailable: "No disponible",
    loading: "Cargando…",
    copyJson: "Copiar JSON",
    jsonCopied: "JSON copiado.",
    hashCopied: "Hash copiado.",
    snowtrace: "Ver en Snowtrace",
    copy: "Copiar",
    rawPayload: "Datos en bruto",
    unblockHint:
      "Cargue documentación crítica para desbloquear.",
    avalancheNetwork: "Avalanche Fuji",
  },
  errors: {
    network:
      "API de FreeZone no disponible. Verifique su conexión a internet o reintente.",
    client: "La solicitud fue rechazada por el servidor.",
    server: "Error del backend. Vuelva a intentar en un momento.",
    upload: "Error al subir el documento.",
  },
  scores: {
    compliance: "Cumplimiento",
    risk: "Riesgo",
    trust: "Confianza",
    overall: "Puntaje general",
  },
  table: {
    caption: "Documentos requeridos para el corredor",
    label: "Etiqueta",
    type: "Tipo",
    company: "Empresa",
    priority: "Prioridad",
    status: "Estado",
  },
} as const;

export type NarrativeKey = keyof typeof COPY.narratives;

export function translateNarrative(
  text: string | undefined,
  companyName?: string
): string {
  if (!text) return COPY.common.notAvailable;
  const translation =
    COPY.narratives[text as NarrativeKey] ?? text;
  if (companyName && COPY.narratives[text as NarrativeKey]) {
    return `${companyName} ${translation}`;
  }
  return translation;
}
