"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ApiStatusIndicator } from "@/components/layout/api-status-indicator";
import { ChannelCard } from "@/components/cards/channel-card";
import { CompanyCard } from "@/components/cards/company-card";
import { KpiCard } from "@/components/cards/kpi-card";
import { PaymentCard } from "@/components/cards/payment-card";
import { NarrativeBanner } from "@/components/panels/narrative-banner";
import { DocumentRequirementsTable } from "@/components/tables/document-requirements-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api, ApiError } from "@/lib/api";
import { COPY } from "@/lib/copy";
import type { DemoStage, DemoStateResponse } from "@/lib/types";
import { toast } from "sonner";

export function DashboardView() {
  const searchParams = useSearchParams();
  const initialStage =
    searchParams.get("stage") === "after" ? "after" : "before";
  const [stage, setStage] = useState<DemoStage>(initialStage);
  const [data, setData] = useState<DemoStateResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (s: DemoStage) => {
    setLoading(true);
    try {
      const res = await api.demoState(s === "after" ? "after" : undefined);
      setData(res);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : COPY.errors.network;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(stage);
  }, [stage, load]);

  const docs = data?.requiredDocuments ?? [];
  const companies = data?.companies ?? [];
  const verifiedCount = docs.filter((d) => d.status === "verified").length;
  const pendingCount = docs.filter((d) => d.status === "pending").length;
  const blockedCount = companies.filter((c) => c.status === "blocked").length;
  const paymentPending =
    data?.pendingPayment?.status === "pending" ||
    data?.pendingPayment?.status === "blocked"
      ? 1
      : 0;

  const blockedCompany = companies.find((c) => c.status === "blocked");

  if (loading && !data) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <p className="text-fz-ink-2">{COPY.dashboard.empty}</p>
        <Button className="mt-4" onClick={() => load(stage)}>
          {COPY.dashboard.retry}
        </Button>
      </div>
    );
  }

  return (
    <div
      className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6"
      data-testid="dashboard-page"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-fz-ink">
          {COPY.dashboard.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <ApiStatusIndicator />
          <Badge className="bg-fz-chain-soft text-fz-chain hover:bg-fz-chain-soft">
            {COPY.dashboard.avalancheBadge}
          </Badge>
          <div
            className="flex rounded-lg border border-fz-border p-1"
            data-testid="stage-toggle"
            data-stage={stage}
          >
            <Button
              type="button"
              variant={stage === "before" ? "default" : "ghost"}
              className={
                stage === "before"
                  ? "bg-fz-ink text-white hover:bg-fz-ink/90"
                  : ""
              }
              onClick={() => setStage("before")}
            >
              {COPY.dashboard.stageBefore}
            </Button>
            <Button
              type="button"
              variant={stage === "after" ? "default" : "ghost"}
              className={
                stage === "after"
                  ? "bg-fz-ink text-white hover:bg-fz-ink/90"
                  : ""
              }
              onClick={() => setStage("after")}
            >
              {COPY.dashboard.stageAfter}
            </Button>
          </div>
        </div>
      </div>

      <NarrativeBanner
        narrative={data.demoNarrative}
        companyName={blockedCompany?.name}
      />

      <ChannelCard channel={data.channel} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard value={verifiedCount} label={COPY.kpis.documentsVerified} />
        <KpiCard value={pendingCount} label={COPY.kpis.documentsPending} />
        <KpiCard value={blockedCount} label={COPY.kpis.companiesBlocked} />
        <KpiCard value={paymentPending} label={COPY.kpis.paymentsPending} />
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-fz-ink">
          {COPY.dashboard.companiesSection}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-fz-ink">
          {COPY.dashboard.documentsSection}
        </h2>
        <DocumentRequirementsTable
          documents={docs}
          companies={companies}
        />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-fz-ink">
          {COPY.dashboard.paymentSection}
        </h2>
        <PaymentCard
          payment={data.pendingPayment}
          fromCompanyName={
            companies.find(
              (c) => c.id === data.pendingPayment.fromCompanyId
            )?.name
          }
        />
      </section>
    </div>
  );
}
