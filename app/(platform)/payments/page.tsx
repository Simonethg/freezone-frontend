import type { Metadata } from "next";
import { PaymentForm } from "@/components/forms/payment-form";
import { api } from "@/lib/api";
import { COPY } from "@/lib/copy";

export const metadata: Metadata = {
  title: COPY.nav.payments,
};

export default async function PaymentsPage() {
  const state = await api.demoState();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-2xl font-bold text-fz-ink">{COPY.payments.title}</h1>
      <PaymentForm demoState={state} />
    </div>
  );
}
