import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debug(...args: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[freezone]", ...args);
  }
}

export function truncateHash(hash: string): string {
  if (!hash || hash.length < 12) return hash || "—";
  return `${hash.slice(0, 6)}…${hash.slice(-4)}`;
}

export function formatScore(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("es-MX")}`;
  }
}

export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    Argentina: "🇦🇷",
    Mexico: "🇲🇽",
    México: "🇲🇽",
    "United States": "🇺🇸",
    Brazil: "🇧🇷",
    Chile: "🇨🇱",
    Colombia: "🇨🇴",
    Peru: "🇵🇪",
    Spain: "🇪🇸",
  };
  return flags[country] ?? "🌐";
}

export function scoreColor(
  value: number,
  axis: "trust" | "risk"
): string {
  if (axis === "risk") {
    if (value >= 60) return "bg-fz-blocked";
    if (value >= 30) return "bg-fz-risk";
    return "bg-fz-trust";
  }
  if (value >= 70) return "bg-fz-trust";
  if (value >= 40) return "bg-fz-risk";
  return "bg-fz-blocked";
}

export function scoreTextColor(
  value: number,
  axis: "trust" | "risk"
): string {
  if (axis === "risk") {
    if (value >= 60) return "text-fz-blocked";
    if (value >= 30) return "text-fz-risk";
    return "text-fz-trust";
  }
  if (value >= 70) return "text-fz-trust";
  if (value >= 40) return "text-fz-risk";
  return "text-fz-blocked";
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function maskSensitivePayload(data: unknown): unknown {
  if (data === null || data === undefined) return data;
  if (Array.isArray(data)) {
    return data.map(maskSensitivePayload);
  }
  if (typeof data === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(
      data as Record<string, unknown>
    )) {
      if (/private_key|secret|password|api_key|token/i.test(key)) {
        result[key] = "***";
      } else {
        result[key] = maskSensitivePayload(value);
      }
    }
    return result;
  }
  return data;
}

export const HASH_PATTERN =
  /^(0x[a-fA-F0-9]{64}|[a-zA-Z0-9-]{4,64})$/;

export function normalizePaymentStatus(
  status: string | undefined
): string {
  if (status === "processing") return "initiated";
  return status ?? "pending";
}

export function getPaymentId(
  payment: { id?: string; paymentId?: string }
): string {
  return payment.id ?? payment.paymentId ?? "";
}
