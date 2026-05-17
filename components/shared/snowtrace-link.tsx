import { ExternalLink } from "lucide-react";
import { COPY } from "@/lib/copy";

type SnowtraceLinkProps = {
  href?: string;
  className?: string;
};

export function SnowtraceLink({ href, className }: SnowtraceLinkProps) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "inline-flex items-center gap-1 text-sm text-fz-chain hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fz-chain focus-visible:ring-offset-2"}
    >
      {COPY.common.snowtrace}
      <ExternalLink className="size-3.5" aria-hidden="true" />
    </a>
  );
}
