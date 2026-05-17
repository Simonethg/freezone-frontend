export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://freezone-demo.vercel.app";

export const DEMO_COMPANY_ID = "company-mx-001";
export const DEMO_PAYMENT_ID = "payment-demo-001";
export const DEMO_DOC_TYPE = "certificate_of_origin" as const;
export const DEMO_DOC_LABEL = "Certificate of Origin — Demo";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = ".pdf,.jpg,.jpeg,.png";

export const POLL_INTERVAL_MS = 1500;
export const MAX_PAYMENT_POLLS = 10;
export const MAX_DEMO_PAYMENT_POLLS = 5;
export const MIN_STEP_DELAY_MS = 600;
