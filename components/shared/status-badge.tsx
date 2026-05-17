import { Badge } from "@/components/ui/badge";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { CompanyStatus, DocumentReqStatus, PaymentStatus } from "@/lib/types";

type StatusValue =
  | PaymentStatus
  | CompanyStatus
  | DocumentReqStatus
  | "ok"
  | "degraded"
  | "unavailable";

const variantMap: Record<
  string,
  { label: string; className: string }
> = {
  pending: {
    label: COPY.status.pending,
    className: "bg-fz-pending-soft text-fz-pending border-fz-border",
  },
  blocked: {
    label: COPY.status.blocked,
    className: "bg-fz-blocked-soft text-fz-blocked border-fz-border",
  },
  initiated: {
    label: COPY.status.initiated,
    className: "bg-fz-chain-soft text-fz-chain border-fz-border",
  },
  processing: {
    label: COPY.status.processing,
    className: "bg-fz-chain-soft text-fz-chain border-fz-border",
  },
  completed: {
    label: COPY.status.completed,
    className: "bg-fz-trust-soft text-fz-trust border-fz-border",
  },
  failed: {
    label: COPY.status.failed,
    className: "bg-fz-blocked-soft text-fz-blocked border-fz-border",
  },
  active: {
    label: COPY.status.active,
    className: "bg-fz-trust-soft text-fz-trust border-fz-border",
  },
  suspended: {
    label: COPY.status.suspended,
    className: "bg-fz-risk-soft text-fz-risk border-fz-border",
  },
  verified: {
    label: COPY.status.verified,
    className: "bg-fz-trust-soft text-fz-trust border-fz-border",
  },
  rejected: {
    label: COPY.status.rejected,
    className: "bg-fz-blocked-soft text-fz-blocked border-fz-border",
  },
  expired: {
    label: COPY.status.expired,
    className: "bg-fz-risk-soft text-fz-risk border-fz-border",
  },
  ok: {
    label: COPY.status.ok,
    className: "bg-fz-trust-soft text-fz-trust border-fz-border",
  },
  degraded: {
    label: COPY.status.degraded,
    className: "bg-fz-risk-soft text-fz-risk border-fz-border",
  },
  unavailable: {
    label: COPY.status.unavailable,
    className: "bg-fz-blocked-soft text-fz-blocked border-fz-border",
  },
};

type StatusBadgeProps = {
  status: StatusValue | string;
  feminine?: boolean;
  className?: string;
};

export function StatusBadge({
  status,
  feminine,
  className,
}: StatusBadgeProps) {
  const key = status?.toLowerCase() ?? "pending";
  const config = variantMap[key] ?? variantMap.pending;
  let label = config.label;
  if (feminine && key === "blocked") {
    label = COPY.status.blockedFem;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 font-medium",
        config.className,
        className
      )}
    >
      <span aria-hidden="true">●</span>
      {label}
    </Badge>
  );
}
