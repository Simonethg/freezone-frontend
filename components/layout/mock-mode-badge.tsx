"use client";

import { Badge } from "@/components/ui/badge";
import { useMockMode } from "@/hooks/use-mock-mode";
import { COPY } from "@/lib/copy";

export function MockModeBadge() {
  const isMock = useMockMode();

  if (!isMock) return null;

  return (
    <Badge
      className="border-fz-risk/30 bg-fz-risk-soft text-fz-risk hover:bg-fz-risk-soft"
      data-testid="mock-mode-badge"
      role="status"
      aria-live="polite"
    >
      {COPY.nav.demoMode}
    </Badge>
  );
}
