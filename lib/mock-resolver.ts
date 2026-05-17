import {
  MOCK_DEMO_STATE_AFTER,
  MOCK_DEMO_STATE_BEFORE,
  MOCK_HEALTH,
  MOCK_PAYMENT,
  MOCK_SCORE,
  MOCK_UPLOAD,
  MOCK_VERIFY_VALID,
} from "./mock-data";
/**
 * Returns deterministic mock payload for a failed network/CORS request, or null.
 */
export function resolveMockResponse<T>(
  path: string,
  method: string
): T | null {
  const [pathname, queryString] = path.split("?");
  const params = new URLSearchParams(queryString ?? "");

  if (pathname === "/api/health" && method === "GET") {
    return { ...MOCK_HEALTH, timestamp: new Date().toISOString() } as T;
  }

  if (pathname === "/api/demo/state" && method === "GET") {
    const stage = params.get("stage");
    return (
      stage === "after" ? MOCK_DEMO_STATE_AFTER : MOCK_DEMO_STATE_BEFORE
    ) as T;
  }

  if (pathname === "/api/documents/upload" && method === "POST") {
    return MOCK_UPLOAD as T;
  }

  if (pathname === "/api/scores/calculate" && method === "POST") {
    return MOCK_SCORE as T;
  }

  const scoreMatch = pathname.match(/^\/api\/scores\/([^/]+)$/);
  if (scoreMatch && method === "GET") {
    return { ...MOCK_SCORE, companyId: scoreMatch[1] } as T;
  }

  if (pathname === "/api/payments/initiate" && method === "POST") {
    return MOCK_PAYMENT as T;
  }

  const paymentMatch = pathname.match(/^\/api\/payments\/status\/([^/]+)$/);
  if (paymentMatch && method === "GET") {
    return { ...MOCK_PAYMENT, id: paymentMatch[1] } as T;
  }

  if (pathname === "/api/documents/verify" && method === "GET") {
    const hash = params.get("hash") ?? "";
    if (hash === "demo-hash" || hash === MOCK_VERIFY_VALID.docHash) {
      return { ...MOCK_VERIFY_VALID, docHash: hash || MOCK_VERIFY_VALID.docHash } as T;
    }
    return {
      success: true,
      isValid: false,
      docHash: hash,
    } as T;
  }

  return null;
}
