import { AlertTriangle } from "lucide-react";
import { translateNarrative } from "@/lib/copy";

type NarrativeBannerProps = {
  narrative?: string;
  companyName?: string;
};

export function NarrativeBanner({
  narrative,
  companyName,
}: NarrativeBannerProps) {
  if (!narrative) return null;

  const text = translateNarrative(narrative, companyName);

  return (
    <div
      className="flex gap-3 rounded-xl border border-fz-risk bg-fz-risk-soft p-4 text-fz-ink"
      role="status"
      aria-live="polite"
    >
      <AlertTriangle
        className="mt-0.5 size-5 shrink-0 text-fz-risk"
        aria-hidden="true"
      />
      <p className="text-sm">{text}</p>
    </div>
  );
}
