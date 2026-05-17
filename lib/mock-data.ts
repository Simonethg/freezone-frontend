import type {
  DemoStateResponse,
  HealthResponse,
  PaymentStatusResponse,
  ScoreResponse,
  UploadResponse,
  VerifyResponse,
} from "./types";

/** Verified API shapes — used when live backend is unreachable (CORS / network). */
export const MOCK_HEALTH: HealthResponse = {
  success: true,
  service: "freezone-demo-api",
  status: "ok",
  mode: "demo",
  timestamp: "2026-05-17T13:36:37.575Z",
};

export const MOCK_DEMO_STATE_BEFORE: DemoStateResponse = {
  success: true,
  stage: "before",
  channel: {
    id: "channel-demo-001",
    name: "AR-MX Industrial Supply Corridor",
    description:
      "Proveedor México → Elaboradora Argentina → Distribuidora USA",
  },
  companies: [
    {
      id: "company-mx-001",
      name: "Materiales Norteño SA",
      type: "supplier",
      country: "Mexico",
      score: { compliance: 35, risk: 72, trust: 28, overall: 30 },
      status: "blocked",
      description: "Proveedor de acero y materiales de construcción",
    },
    {
      id: "company-ar-001",
      name: "Industrias Austral SA",
      type: "manufacturer",
      country: "Argentina",
      score: { compliance: 85, risk: 18, trust: 82, overall: 83 },
      status: "active",
      description: "Manufactura de componentes industriales",
    },
    {
      id: "company-us-001",
      name: "Global Parts Distribution LLC",
      type: "distributor",
      country: "United States",
      score: { compliance: 79, risk: 24, trust: 76, overall: 77 },
      status: "active",
      description: "Distribución industrial norteamérica",
    },
  ],
  requiredDocuments: [
    {
      id: "doc-req-001",
      companyId: "company-mx-001",
      docType: "certificate_of_origin",
      label: "Certificate of Origin",
      status: "pending",
      priority: "critical",
    },
    {
      id: "doc-req-002",
      companyId: "company-mx-001",
      docType: "quality_report",
      label: "Quality Report Q1 2025",
      status: "verified",
      priority: "high",
    },
    {
      id: "doc-req-003",
      companyId: "company-mx-001",
      docType: "purchase_order",
      label: "Purchase Order IND-2025-0134",
      status: "verified",
      priority: "high",
    },
  ],
  pendingPayment: {
    id: "payment-demo-001",
    channelId: "channel-demo-001",
    amountUsd: 47500,
    currencyFrom: "ARS",
    currencyTo: "MXN",
    fromCompanyId: "company-ar-001",
    toCompanyId: "company-mx-001",
    status: "blocked",
    reason: "Supplier trust score below minimum threshold.",
  },
  demoNarrative:
    "Supplier is blocked until critical documentation is verified.",
};

export const MOCK_DEMO_STATE_AFTER: DemoStateResponse = {
  ...MOCK_DEMO_STATE_BEFORE,
  stage: "after",
  companies: MOCK_DEMO_STATE_BEFORE.companies.map((c) =>
    c.id === "company-mx-001"
      ? {
          ...c,
          status: "active" as const,
          score: { compliance: 92, risk: 8, trust: 89, overall: 90 },
        }
      : c
  ),
  requiredDocuments: MOCK_DEMO_STATE_BEFORE.requiredDocuments.map((d) => ({
    ...d,
    status: "verified" as const,
  })),
  pendingPayment: {
    ...MOCK_DEMO_STATE_BEFORE.pendingPayment,
    status: "completed",
    reason: "Payment ready for execution.",
  },
  demoNarrative: "All documents verified.",
};

export const MOCK_UPLOAD: UploadResponse = {
  success: true,
  docId: "doc-demo-001",
  docHash:
    "0x7a3f2c1b9e4d8f6a2c5e7b3d9f1a4c6e8b2d5f7a9c1e3b5d7f9a2c4e6b8d0f2a",
  txHash:
    "0x9d4e8a2f6c1b5e3d7f9a2c4b6e8d0f2a4c6b8e0d2f4a6c8b0e2d4f6a8c0b2e4",
  avalancheNetwork: "Fuji Testnet",
  avalancheExplorer:
    "https://testnet.snowtrace.io/tx/0x9d4e8a2f6c1b5e3d7f9a2c4b6e8d0f2a4c6b8e0d2f4a6c8b0e2d4f6a8c0b2e4",
  registeredAt: "2026-05-17T13:36:37.575Z",
  companyId: "company-mx-001",
  docType: "certificate_of_origin",
};

export const MOCK_SCORE: ScoreResponse = {
  success: true,
  companyId: "company-mx-001",
  companyName: "Materiales Norteño SA",
  score: { compliance: 92, risk: 8, trust: 89, overall: 90 },
  status: "active",
  calculatedAt: "2026-05-17T13:36:37.575Z",
  rationale: "All critical documents verified. Trust score elevated.",
};

export const MOCK_PAYMENT: PaymentStatusResponse = {
  success: true,
  id: "payment-demo-001",
  channelId: "channel-demo-001",
  amountUsd: 47500,
  currencyFrom: "ARS",
  currencyTo: "MXN",
  fromCompanyId: "company-ar-001",
  toCompanyId: "company-mx-001",
  status: "completed",
  txHash:
    "0x9d4e8a2f6c1b5e3d7f9a2c4b6e8d0f2a4c6b8e0d2f4a6c8b0e2d4f6a8c0b2e4",
  avalancheExplorer:
    "https://testnet.snowtrace.io/tx/0x9d4e8a2f6c1b5e3d7f9a2c4b6e8d0f2a4c6b8e0d2f4a6c8b0e2d4f6a8c0b2e4",
  initiatedAt: "2026-05-17T13:36:37.575Z",
  completedAt: "2026-05-17T13:36:45.575Z",
};

export const MOCK_VERIFY_VALID: VerifyResponse = {
  success: true,
  isValid: true,
  docHash: "demo-hash",
  companyId: "company-mx-001",
  companyName: "Materiales Norteño SA",
  docType: "certificate_of_origin",
  registeredAt: "2026-05-17T13:36:37.575Z",
  avalancheNetwork: "Fuji Testnet",
  txHash:
    "0x9d4e8a2f6c1b5e3d7f9a2c4b6e8d0f2a4c6b8e0d2f4a6c8b0e2d4f6a8c0b2e4",
  avalancheExplorer:
    "https://testnet.snowtrace.io/tx/0x9d4e8a2f6c1b5e3d7f9a2c4b6e8d0f2a4c6b8e0d2f4a6c8b0e2d4f6a8c0b2e4",
  message: "Original document verified on Avalanche Fuji.",
};
