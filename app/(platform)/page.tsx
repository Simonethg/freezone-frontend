import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck, LineChart, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COPY } from "@/lib/copy";

export const metadata: Metadata = {
  title: COPY.brand.fullName,
};

const flowSteps = [
  "Tablero inicial",
  "Cargar documento",
  "Anclar hash",
  "Calcular puntaje",
  "Refrescar estado",
  "Habilitar pago",
  "Iniciar pago",
  "Pago completado",
];

export default function LandingPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-fz-border bg-gradient-to-b from-fz-surface to-fz-bg px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-fz-ink sm:text-5xl">
            {COPY.brand.fullName}
          </h1>
          <p className="mt-4 font-mono text-lg text-fz-ink-2">
            {COPY.brand.tagline}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-fz-ink-2">
            {COPY.landing.subhead}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants(),
                "min-h-11 w-full bg-fz-ink text-white hover:bg-fz-ink/90 sm:w-auto"
              )}
            >
              {COPY.landing.ctaDashboard}
            </Link>
            <Link
              href="/demo"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "min-h-11 w-full border-fz-border-strong sm:w-auto"
              )}
            >
              {COPY.landing.ctaDemo}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-fz-border bg-fz-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <CardHeader>
              <FileCheck className="size-8 text-fz-trust" aria-hidden="true" />
              <CardTitle>{COPY.landing.features.evidence.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-fz-ink-2">
                {COPY.landing.features.evidence.description}
              </p>
            </CardContent>
          </Card>
          <Card className="border-fz-border bg-fz-surface shadow-[0_1px_2px_rgba(0,0,0,0,0.04)]">
            <CardHeader>
              <LineChart className="size-8 text-fz-chain" aria-hidden="true" />
              <CardTitle>{COPY.landing.features.intelligence.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-fz-ink-2">
                {COPY.landing.features.intelligence.description}
              </p>
            </CardContent>
          </Card>
          <Card className="border-fz-border bg-fz-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <CardHeader>
              <Zap className="size-8 text-fz-risk" aria-hidden="true" />
              <CardTitle>{COPY.landing.features.settlement.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-fz-ink-2">
                {COPY.landing.features.settlement.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-fz-border bg-fz-surface-2 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold text-fz-ink">
            {COPY.landing.howItWorks}
          </h2>
          <ol className="mt-8 flex gap-4 overflow-x-auto pb-4">
            {flowSteps.map((step, i) => (
              <li
                key={step}
                className="flex min-w-[140px] shrink-0 flex-col items-center gap-2 text-center"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-fz-ink text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-sm text-fz-ink-2">{step}</span>
                {i < flowSteps.length - 1 ? (
                  <ArrowRight
                    className="hidden size-4 text-fz-ink-3 lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6">
        <Link
          href="/verify"
          className="text-sm font-medium text-fz-chain underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fz-chain focus-visible:ring-offset-2"
        >
          {COPY.landing.verifyLink}
        </Link>
        <p className="mx-auto mt-6 max-w-3xl text-xs text-fz-ink-3">
          {COPY.landing.disclosure}
        </p>
      </section>
    </div>
  );
}
