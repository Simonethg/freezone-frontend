"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";

type ApiHealth = "ok" | "degraded" | "unavailable";

export function ApiStatusIndicator() {
  const [status, setStatus] = useState<ApiHealth>("ok");

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const res = await api.health();
        if (!mounted) return;
        setStatus(res.status === "ok" ? "ok" : "degraded");
      } catch (err) {
        if (!mounted) return;
        if (err instanceof ApiError && err.status === 0) {
          setStatus("unavailable");
        } else {
          setStatus("degraded");
        }
      }
    }

    check();
    const id = setInterval(check, 30000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const labels = {
    ok: COPY.status.ok,
    degraded: COPY.status.degraded,
    unavailable: COPY.status.unavailable,
  };

  const dotColors = {
    ok: "bg-fz-trust",
    degraded: "bg-fz-risk",
    unavailable: "bg-fz-blocked",
  };

  return (
    <div
      className="flex items-center gap-2 text-sm text-fz-ink-2"
      data-testid="api-status-indicator"
      data-status={status}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn("size-2 rounded-full", dotColors[status])}
        aria-hidden="true"
      />
      <span>{labels[status]}</span>
    </div>
  );
}
