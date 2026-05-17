import { formatScore, scoreColor, cn } from "@/lib/utils";

type ScoreBarProps = {
  label: string;
  value: number;
  axis: "trust" | "risk";
};

export function ScoreBar({ label, value, axis }: ScoreBarProps) {
  const safeValue = Math.min(100, Math.max(0, value ?? 0));
  const barColor = scoreColor(safeValue, axis);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-fz-ink-2">{label}</span>
        <span className="font-mono text-fz-ink">{formatScore(safeValue)}</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-fz-pending-soft"
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${formatScore(safeValue)}`}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 motion-reduce:transition-none",
            barColor
          )}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
