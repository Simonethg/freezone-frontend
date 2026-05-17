import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HashChip } from "@/components/shared/hash-chip";
import { StatusBadge } from "@/components/shared/status-badge";
import { COPY, translateNarrative } from "@/lib/copy";
import type { PendingPayment, PaymentStatusResponse } from "@/lib/types";
import {
  formatCurrency,
  formatDate,
  getPaymentId,
  normalizePaymentStatus,
} from "@/lib/utils";

type PaymentCardProps = {
  payment: PendingPayment | PaymentStatusResponse;
  fromCompanyName?: string;
};

export function PaymentCard({ payment, fromCompanyName }: PaymentCardProps) {
  const status = normalizePaymentStatus(payment?.status);
  const amount = payment?.amountUsd ?? 0;
  const completedAt =
    "completedAt" in payment
      ? payment.completedAt
      : "settledAt" in payment
        ? payment.settledAt
        : undefined;

  return (
    <Card className="border-fz-border bg-fz-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="font-mono text-2xl text-fz-ink">
            {formatCurrency(amount, "USD")}
          </CardTitle>
          <p className="mt-1 text-sm text-fz-ink-2">
            {payment?.currencyFrom ?? "—"} → {payment?.currencyTo ?? "—"}
          </p>
          <p className="mt-1 text-xs text-fz-ink-3">
            ID: {getPaymentId(payment) || COPY.common.notAvailable}
          </p>
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent className="space-y-3">
        {status === "blocked" && payment?.reason ? (
          <div
            className="rounded-lg border border-fz-risk bg-fz-risk-soft p-4 text-sm text-fz-ink"
            role="alert"
          >
            <p>{translateNarrative(payment.reason, fromCompanyName)}</p>
            {payment.reason.toLowerCase().includes("trust score") ? (
              <p className="mt-2 font-medium">{COPY.common.unblockHint}</p>
            ) : null}
          </div>
        ) : null}
        {status === "completed" &&
        "txHash" in payment &&
        payment.txHash ? (
          <HashChip
            hash={payment.txHash}
            label="txHash"
            href={
              "avalancheExplorer" in payment
                ? payment.avalancheExplorer
                : undefined
            }
          />
        ) : null}
        {status === "completed" && completedAt ? (
          <p className="text-sm text-fz-ink-3">{formatDate(completedAt)}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
