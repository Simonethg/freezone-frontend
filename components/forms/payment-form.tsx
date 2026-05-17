"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentCard } from "@/components/cards/payment-card";
import { api, ApiError } from "@/lib/api";
import {
  DEMO_PAYMENT_ID,
  MAX_PAYMENT_POLLS,
  POLL_INTERVAL_MS,
} from "@/lib/config";
import { COPY } from "@/lib/copy";
import type { DemoStateResponse, PaymentStatusResponse } from "@/lib/types";
import { normalizePaymentStatus, sleep } from "@/lib/utils";
import { toast } from "sonner";

const schema = z.object({
  paymentId: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

type PaymentFormProps = {
  demoState: DemoStateResponse;
};

export function PaymentForm({ demoState }: PaymentFormProps) {
  const [status, setStatus] = useState<PaymentStatusResponse | null>(null);
  const [polling, setPolling] = useState(false);
  const payment = demoState.pendingPayment;

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { paymentId: DEMO_PAYMENT_ID },
  });

  async function pollStatus(paymentId: string) {
    setPolling(true);
    for (let i = 0; i < MAX_PAYMENT_POLLS; i++) {
      try {
        const res = await api.getPaymentStatus(paymentId);
        setStatus(res);
        const normalized = normalizePaymentStatus(res.status);
        if (normalized === "completed" || normalized === "failed") {
          break;
        }
      } catch {
        break;
      }
      await sleep(POLL_INTERVAL_MS);
    }
    setPolling(false);
  }

  async function onSubmit(values: FormValues) {
    try {
      const res = await api.initiatePayment(values.paymentId);
      setStatus(res);
      toast.success(COPY.payments.submit);
      await pollStatus(values.paymentId);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : COPY.errors.network;
      toast.error(message);
    }
  }

  useEffect(() => {
    if (payment?.id) {
      setStatus({
        success: true,
        ...payment,
        status: payment.status,
      });
    }
  }, [payment]);

  return (
    <div className="space-y-8" data-testid="payments-page">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Monto (USD)</Label>
            <Input readOnly value={payment?.amountUsd ?? ""} />
          </div>
          <div className="space-y-1">
            <Label>Monedas</Label>
            <Input
              readOnly
              value={`${payment?.currencyFrom ?? ""} → ${payment?.currencyTo ?? ""}`}
            />
          </div>
          <div className="space-y-1">
            <Label>Empresa origen</Label>
            <Input readOnly value={payment?.fromCompanyId ?? ""} />
          </div>
          <div className="space-y-1">
            <Label>Empresa destino</Label>
            <Input readOnly value={payment?.toCompanyId ?? ""} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="field-payment-id">{COPY.payments.paymentId}</Label>
          <Input
            id="field-payment-id"
            className="font-mono"
            {...register("paymentId")}
          />
        </div>

        <Button
          type="submit"
          disabled={polling}
          className="min-h-11 bg-fz-ink text-white hover:bg-fz-ink/90"
        >
          {COPY.payments.submit}
        </Button>
      </form>

      <section aria-labelledby="payment-status-heading">
        <h2
          id="payment-status-heading"
          className="mb-4 text-lg font-semibold text-fz-ink"
        >
          {COPY.payments.statusTitle}
        </h2>
        {polling ? (
          <p className="text-sm text-fz-ink-3" role="status" aria-live="polite">
            {COPY.payments.polling}
          </p>
        ) : null}
        {status ? (
          <PaymentCard payment={status} />
        ) : null}
      </section>
    </div>
  );
}
