// API types verified against freezone-demo.vercel.app (May 2026)

export type ApiBaseResponse = { success: boolean };

export type HealthResponse = ApiBaseResponse & {
  service: string;
  status: "ok" | "degraded";
  mode: "demo" | "production";
  timestamp: string;
};

export type DemoStage = "before" | "after";

export type CompanyType = "supplier" | "manufacturer" | "distributor" | "bank";
export type CompanyStatus = "blocked" | "active" | "suspended";

export type Score = {
  compliance: number;
  risk: number;
  trust: number;
  overall: number;
};

export type Company = {
  id: string;
  name: string;
  type: CompanyType;
  country: string;
  description: string;
  score: Score;
  status: CompanyStatus;
};

export type Channel = {
  id: string;
  name: string;
  description: string;
};

export type DocumentPriority = "critical" | "high" | "medium" | "low";
export type DocumentReqStatus = "pending" | "verified" | "rejected" | "expired";
export type DocumentType =
  | "certificate_of_origin"
  | "quality_report"
  | "purchase_order"
  | "invoice"
  | "packing_list"
  | "other";

export type RequiredDocument = {
  id: string;
  companyId: string;
  docType: DocumentType;
  label: string;
  status: DocumentReqStatus;
  priority: DocumentPriority;
};

export type PaymentStatus =
  | "pending"
  | "blocked"
  | "initiated"
  | "completed"
  | "failed"
  | "processing";

export type PendingPayment = {
  id: string;
  channelId: string;
  amountUsd: number;
  currencyFrom: string;
  currencyTo: string;
  fromCompanyId: string;
  toCompanyId: string;
  status: PaymentStatus;
  reason?: string;
};

export type DemoStateResponse = ApiBaseResponse & {
  stage: DemoStage;
  channel: Channel;
  companies: Company[];
  requiredDocuments: RequiredDocument[];
  pendingPayment: PendingPayment;
  demoNarrative: string;
};

export type UploadResponse = ApiBaseResponse & {
  docId: string;
  docHash: string;
  txHash: string;
  avalancheNetwork: string;
  avalancheExplorer: string;
  registeredAt: string;
  companyId: string;
  docType: DocumentType;
};

export type ScoreResponse = ApiBaseResponse & {
  companyId: string;
  companyName: string;
  score: Score;
  status: CompanyStatus;
  calculatedAt: string;
  rationale?: string;
};

export type PaymentStatusResponse = ApiBaseResponse & {
  id?: string;
  paymentId?: string;
  channelId?: string;
  amountUsd?: number;
  currencyFrom?: string;
  currencyTo?: string;
  fromCompanyId?: string;
  toCompanyId?: string;
  status: PaymentStatus;
  reason?: string;
  txHash?: string;
  avalancheExplorer?: string;
  initiatedAt?: string;
  completedAt?: string;
  settledAt?: string;
  message?: string;
};

export type VerifyResponse = ApiBaseResponse & {
  isValid: boolean;
  docHash: string;
  companyId?: string;
  companyName?: string;
  docType?: DocumentType;
  registeredAt?: string;
  avalancheNetwork?: string;
  txHash?: string;
  avalancheExplorer?: string;
  message?: string;
};

export type StepStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "failed";

export type DemoStep = {
  id: string;
  title: string;
  status: StepStatus;
  timestamp?: string;
  payload?: unknown;
  error?: string;
};
