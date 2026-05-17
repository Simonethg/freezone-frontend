"use client";

import { CheckCircle2, Circle, Loader2, XCircle } from "lucide-react";
import { JsonDebugPanel } from "@/components/panels/json-debug-panel";
import type { DemoStep } from "@/lib/types";
import { cn } from "@/lib/utils";

type OperationStepperProps = {
  steps: DemoStep[];
  onRetry?: (index: number) => void;
};

const statusIcons = {
  not_started: Circle,
  in_progress: Loader2,
  completed: CheckCircle2,
  failed: XCircle,
};

const statusColors = {
  not_started: "text-fz-ink-3",
  in_progress: "text-fz-chain animate-spin motion-reduce:animate-none",
  completed: "text-fz-trust",
  failed: "text-fz-blocked",
};

export function OperationStepper({ steps, onRetry }: OperationStepperProps) {
  const activeIndex = steps.findIndex(
    (s) => s.status === "in_progress" || s.status === "failed"
  );

  return (
    <ol
      className="grid gap-4 lg:grid-cols-4"
      aria-label="Progreso de la demostración"
      aria-live="polite"
    >
      {steps.map((step, index) => {
        const Icon = statusIcons[step.status];
        const isActive =
          step.status === "in_progress" ||
          (activeIndex === index && step.status === "failed");

        return (
          <li
            key={step.id}
            className={cn(
              "rounded-xl border border-fz-border bg-fz-surface p-4 transition-colors duration-300 motion-reduce:transition-none",
              isActive && "ring-2 ring-fz-ink ring-offset-2"
            )}
            data-testid={`stepper-step-${index}`}
            data-status={step.status}
            aria-current={isActive ? "step" : undefined}
          >
            <div className="flex items-start gap-3">
              <Icon
                className={cn("mt-0.5 size-5 shrink-0", statusColors[step.status])}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1 space-y-2">
                <p className="font-medium text-fz-ink">{step.title}</p>
                {step.timestamp ? (
                  <p className="text-xs text-fz-ink-3">{step.timestamp}</p>
                ) : null}
                {step.error ? (
                  <p className="text-sm text-fz-blocked" role="alert">
                    {step.error}
                  </p>
                ) : null}
                {step.status === "failed" && onRetry ? (
                  <button
                    type="button"
                    className="text-sm font-medium text-fz-ink underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fz-ink focus-visible:ring-offset-2"
                    onClick={() => onRetry(index)}
                  >
                    Reintentar
                  </button>
                ) : null}
                <JsonDebugPanel data={step.payload} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
