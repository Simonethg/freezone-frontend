import type {
  DemoStateResponse,
  HealthResponse,
  PaymentStatusResponse,
  ScoreResponse,
  UploadResponse,
  VerifyResponse,
} from "./types";
import { API_BASE_URL } from "./config";
import { COPY } from "./copy";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public payload?: unknown
  ) {
    super(message);
  }
}

async function safeJson(r: Response): Promise<unknown> {
  try {
    return await r.json();
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { isPublic?: boolean }
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers: HeadersInit = {
    ...(options?.headers ?? {}),
  };

  const hasBody = options?.body !== undefined;
  if (hasBody && !(options?.body instanceof FormData)) {
    (headers as Record<string, string>)["Content-Type"] =
      "application/json";
  }

  const init: RequestInit = {
    ...options,
    headers,
    credentials: options?.isPublic ? "omit" : "same-origin",
  };

  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    throw new ApiError(0, COPY.errors.network);
  }

  if (!response.ok) {
    const payload = await safeJson(response);
    throw new ApiError(
      response.status,
      response.status >= 500
        ? COPY.errors.server
        : COPY.errors.client,
      payload
    );
  }

  return (await response.json()) as T;
}

export async function apiUpload<T>(
  path: string,
  form: FormData
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  let response: Response;
  try {
    response = await fetch(url, { method: "POST", body: form });
  } catch {
    throw new ApiError(0, COPY.errors.network);
  }
  if (!response.ok) {
    throw new ApiError(response.status, COPY.errors.upload);
  }
  return (await response.json()) as T;
}

export const api = {
  health: () => apiFetch<HealthResponse>("/api/health"),
  demoState: (stage?: "after") =>
    apiFetch<DemoStateResponse>(
      stage ? `/api/demo/state?stage=${stage}` : "/api/demo/state"
    ),
  uploadDocument: (form: FormData) =>
    apiUpload<UploadResponse>("/api/documents/upload", form),
  calculateScore: (companyId: string) =>
    apiFetch<ScoreResponse>("/api/scores/calculate", {
      method: "POST",
      body: JSON.stringify({ companyId }),
    }),
  getScore: (companyId: string) =>
    apiFetch<ScoreResponse>(`/api/scores/${companyId}`),
  initiatePayment: (paymentId: string) =>
    apiFetch<PaymentStatusResponse>("/api/payments/initiate", {
      method: "POST",
      body: JSON.stringify({ paymentId }),
    }),
  getPaymentStatus: (paymentId: string) =>
    apiFetch<PaymentStatusResponse>(
      `/api/payments/status/${paymentId}`
    ),
  verifyDocument: (hash: string) =>
    apiFetch<VerifyResponse>(
      `/api/documents/verify?hash=${encodeURIComponent(hash)}`,
      { isPublic: true }
    ),
};
