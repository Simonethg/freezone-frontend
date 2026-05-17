"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ChannelCard } from "@/components/cards/channel-card";
import { DocumentCard } from "@/components/cards/document-card";
import { PaymentCard } from "@/components/cards/payment-card";
import { ScoreCard } from "@/components/cards/score-card";
import { OperationStepper } from "@/components/panels/operation-stepper";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api, ApiError } from "@/lib/api";
import {
  DEMO_COMPANY_ID,
  DEMO_DOC_LABEL,
  DEMO_DOC_TYPE,
  DEMO_PAYMENT_ID,
  MAX_DEMO_PAYMENT_POLLS,
  MIN_STEP_DELAY_MS,
  POLL_INTERVAL_MS,
} from "@/lib/config";
import { COPY } from "@/lib/copy";
import type {
  DemoStateResponse,
  DemoStep,
  ScoreResponse,
  StepStatus,
  UploadResponse,
} from "@/lib/types";
import { formatDate, normalizePaymentStatus, sleep } from "@/lib/utils";
import { toast } from "sonner";

function createInitialSteps(): DemoStep[] {
  return COPY.demoSteps.map((title, i) => ({
    id: `step-${i}`,
    title,
    status: "not_started" as StepStatus,
  }));
}

export function DemoFlow() {
  const [steps, setSteps] = useState<DemoStep[]>(createInitialSteps);
  const [running, setRunning] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [channel, setChannel] = useState<DemoStateResponse["channel"] | null>(
    null
  );
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [scoreResult, setScoreResult] = useState<ScoreResponse | null>(null);
  const [afterState, setAfterState] = useState<DemoStateResponse | null>(null);
  const [paymentResult, setPaymentResult] = useState<
    Awaited<ReturnType<typeof api.getPaymentStatus>> | null
  >(null);

  const updateStep = useCallback(
    (index: number, patch: Partial<DemoStep>) => {
      setSteps((prev) =>
        prev.map((s, i) => (i === index ? { ...s, ...patch } : s))
      );
    },
    []
  );

  const runStep = useCallback(
    async (index: number, fn: () => Promise<unknown>) => {
      updateStep(index, {
        status: "in_progress",
        error: undefined,
        timestamp: formatDate(new Date().toISOString()),
      });
      try {
        const payload = await fn();
        await sleep(MIN_STEP_DELAY_MS);
        updateStep(index, {
          status: "completed",
          payload,
          timestamp: formatDate(new Date().toISOString()),
        });
        return payload;
      } catch (err) {
        const message =
          err instanceof ApiError ? err.message : COPY.errors.network;
        updateStep(index, { status: "failed", error: message });
        throw err;
      }
    },
    [updateStep]
  );

  const runFullFlow = useCallback(async () => {
    setRunning(true);
    setSteps(createInitialSteps());
    setUploadResult(null);
    setScoreResult(null);
    setAfterState(null);
    setPaymentResult(null);

    try {
      const initial = (await runStep(0, () =>
        api.demoState()
      )) as DemoStateResponse;
      setChannel(initial.channel);

      const upload = (await runStep(1, async () => {
        const fileRes = await fetch("/demo-document.pdf");
        const blob = await fileRes.blob();
        const file = new File([blob], "demo-document.pdf", {
          type: "application/pdf",
        });
        const form = new FormData();
        form.append("file", file);
        form.append("companyId", DEMO_COMPANY_ID);
        form.append("docType", DEMO_DOC_TYPE);
        form.append("label", DEMO_DOC_LABEL);
        return api.uploadDocument(form);
      })) as UploadResponse;

      setUploadResult(upload);

      await runStep(2, async () => ({
        docHash: upload.docHash,
        txHash: upload.txHash,
        avalancheExplorer: upload.avalancheExplorer,
      }));

      const score = (await runStep(3, () =>
        api.calculateScore(DEMO_COMPANY_ID)
      )) as ScoreResponse;
      setScoreResult(score);

      const after = (await runStep(4, () =>
        api.demoState("after")
      )) as DemoStateResponse;
      setAfterState(after);

      await runStep(5, async () => {
        const status = after.pendingPayment?.status;
        const eligible =
          status === "pending" ||
          status === "initiated" ||
          status === "processing";
        return { eligible, status };
      });

      await runStep(6, () => api.initiatePayment(DEMO_PAYMENT_ID));

      const payment = (await runStep(7, async () => {
        for (let i = 0; i < MAX_DEMO_PAYMENT_POLLS; i++) {
          const res = await api.getPaymentStatus(DEMO_PAYMENT_ID);
          const normalized = normalizePaymentStatus(res.status);
          if (
            normalized === "completed" ||
            normalized === "failed"
          ) {
            setPaymentResult(res);
            return res;
          }
          await sleep(POLL_INTERVAL_MS);
        }
        const final = await api.getPaymentStatus(DEMO_PAYMENT_ID);
        setPaymentResult(final);
        return final;
      })) as Awaited<ReturnType<typeof api.getPaymentStatus>>;
      setPaymentResult(payment);
    } catch {
      setSteps((prev) => {
        const failedIdx = prev.findIndex((s) => s.status === "failed");
        return prev.map((s, i) =>
          i > failedIdx && failedIdx >= 0
            ? { ...s, status: "not_started" as StepStatus }
            : s
        );
      });
      toast.error(COPY.errors.network);
    } finally {
      setRunning(false);
    }
  }, [runStep]);

  const loadFinalState = useCallback(async () => {
    setShowFinal(true);
    setRunning(true);
    setSteps(createInitialSteps());
    try {
      const initial = await api.demoState();
      setChannel(initial.channel);
      const after = await api.demoState("after");
      setAfterState(after);
      setSteps(
        createInitialSteps().map((s) => ({
          ...s,
          status: "completed" as StepStatus,
        }))
      );
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : COPY.errors.network
      );
    } finally {
      setRunning(false);
    }
  }, []);

  async function handleRetry(index: number) {
    setRunning(true);
    try {
      if (index === 0) await runStep(0, () => api.demoState());
      else if (index === 1) await runFullFlow();
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6" data-testid="demo-page">
      <header className="space-y-4">
        <h1 className="text-2xl font-bold text-fz-ink">{COPY.demo.title}</h1>
        {channel ? <ChannelCard channel={channel} /> : null}
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant={!showFinal ? "default" : "outline"}
            className={
              !showFinal ? "bg-fz-ink text-white hover:bg-fz-ink/90" : ""
            }
            onClick={() => setShowFinal(false)}
          >
            {COPY.demo.liveMode}
          </Button>
          <Button
            type="button"
            variant={showFinal ? "default" : "outline"}
            className={
              showFinal ? "bg-fz-ink text-white hover:bg-fz-ink/90" : ""
            }
            onClick={loadFinalState}
          >
            {COPY.demo.finalMode}
          </Button>
        </div>
      </header>

      {!showFinal ? (
        <Button
          type="button"
          data-testid="btn-run-demo"
          disabled={running}
          className="min-h-11 bg-fz-ink text-white hover:bg-fz-ink/90"
          onClick={runFullFlow}
        >
          {COPY.demo.runFull}
        </Button>
      ) : null}

      <OperationStepper steps={steps} onRetry={handleRetry} />

      {(scoreResult || uploadResult || paymentResult) && !running ? (
        <section className="space-y-6" aria-labelledby="demo-results">
          <h2 id="demo-results" className="text-lg font-semibold">
            {COPY.demo.results}
          </h2>
          {scoreResult ? (
            <ScoreCard
              companyName={scoreResult.companyName}
              score={scoreResult.score}
              rationale={scoreResult.rationale}
            />
          ) : null}
          {uploadResult ? (
            <DocumentCard
              docType={uploadResult.docType}
              docHash={uploadResult.docHash}
              txHash={uploadResult.txHash}
              avalancheExplorer={uploadResult.avalancheExplorer}
              registeredAt={uploadResult.registeredAt}
            />
          ) : null}
          {paymentResult ? <PaymentCard payment={paymentResult} /> : null}
          <Link
            href="/dashboard?stage=after"
            className={cn(buttonVariants({ variant: "outline" }), "min-h-11 inline-flex")}
          >
            {COPY.demo.viewDashboard}
          </Link>
        </section>
      ) : null}
    </div>
  );
}
