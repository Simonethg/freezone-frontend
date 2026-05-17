"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyButton } from "@/components/shared/copy-button";
import { SnowtraceLink } from "@/components/shared/snowtrace-link";
import { truncateHash } from "@/lib/utils";

type HashChipProps = {
  hash: string;
  label: string;
  href?: string;
};

export function HashChip({ hash, label, href }: HashChipProps) {
  const display = truncateHash(hash);

  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-lg border border-fz-border bg-fz-surface-2 px-3 py-2"
      data-testid={`hash-chip-${label}`}
      data-full-hash={hash}
    >
      <span className="text-xs font-medium text-fz-ink-3">{label}</span>
      <Tooltip>
        <TooltipTrigger
          className="cursor-default font-mono text-sm text-fz-ink"
          aria-label={`${label}: ${hash}`}
        >
          {display}
        </TooltipTrigger>
        <TooltipContent className="max-w-md break-all font-mono text-xs">
          {hash}
        </TooltipContent>
      </Tooltip>
      <CopyButton value={hash} />
      {href ? <SnowtraceLink href={href} /> : null}
    </div>
  );
}
