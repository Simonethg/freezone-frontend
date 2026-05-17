import type { Metadata } from "next";
import { HashChip } from "@/components/shared/hash-chip";
import { StatusBadge } from "@/components/shared/status-badge";
import { SnowtraceLink } from "@/components/shared/snowtrace-link";
import { api } from "@/lib/api";
import { COPY } from "@/lib/copy";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ hash: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { hash } = await params;
  return { title: `${COPY.verify.title}: ${hash.slice(0, 12)}…` };
}

export default async function VerifyHashPage({ params }: PageProps) {
  const { hash } = await params;
  const decoded = decodeURIComponent(hash);

  let result;
  try {
    result = await api.verifyDocument(decoded);
  } catch {
    result = { success: false, isValid: false, docHash: decoded };
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-2xl font-bold text-fz-ink">{COPY.verify.title}</h1>

      <article
        className="rounded-xl border border-fz-border bg-fz-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        data-testid="verify-result"
        data-is-valid={result.isValid ? "true" : "false"}
      >
        <StatusBadge
          status={result.isValid ? "verified" : "pending"}
          className={
            result.isValid
              ? "bg-fz-trust-soft text-fz-trust"
              : "bg-fz-pending-soft text-fz-pending"
          }
        />
        <p className="mt-4 text-lg font-medium text-fz-ink">
          {result.isValid ? COPY.verify.valid : COPY.verify.invalid}
        </p>

        {result.isValid ? (
          <dl className="mt-6 space-y-3 text-sm">
            {result.docType ? (
              <div>
                <dt className="text-fz-ink-3">Tipo</dt>
                <dd className="text-fz-ink">
                  {COPY.docType[result.docType as keyof typeof COPY.docType] ??
                    result.docType}
                </dd>
              </div>
            ) : null}
            {result.companyName ? (
              <div>
                <dt className="text-fz-ink-3">Empresa</dt>
                <dd className="text-fz-ink">{result.companyName}</dd>
              </div>
            ) : null}
            {result.avalancheNetwork ? (
              <div>
                <dt className="text-fz-ink-3">Red</dt>
                <dd>
                  <span className="inline-flex rounded-md bg-fz-chain-soft px-2 py-1 text-fz-chain">
                    {COPY.common.avalancheNetwork}
                  </span>
                </dd>
              </div>
            ) : null}
            {result.avalancheExplorer ? (
              <div>
                <dt className="text-fz-ink-3">Explorador</dt>
                <dd>
                  <SnowtraceLink href={result.avalancheExplorer} />
                </dd>
              </div>
            ) : null}
            {result.registeredAt ? (
              <div>
                <dt className="text-fz-ink-3">Registrado</dt>
                <dd className="text-fz-ink">{formatDate(result.registeredAt)}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </article>

      <div className="mt-6">
        <HashChip hash={decoded} label="docHash" />
      </div>

      <p className="mt-8 text-xs text-fz-ink-3">{COPY.verify.disclosure}</p>
    </div>
  );
}
