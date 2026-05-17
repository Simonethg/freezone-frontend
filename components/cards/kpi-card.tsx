type KpiCardProps = {
  value: number | string;
  label: string;
};

export function KpiCard({ value, label }: KpiCardProps) {
  return (
    <article className="rounded-xl border border-fz-border bg-fz-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <p className="font-mono text-4xl font-semibold text-fz-ink">{value}</p>
      <p className="mt-2 text-sm text-fz-ink-3">{label}</p>
    </article>
  );
}
