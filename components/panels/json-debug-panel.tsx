"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/copy";
import { maskSensitivePayload } from "@/lib/utils";
import { CopyButton } from "@/components/shared/copy-button";
import { toast } from "sonner";

type JsonDebugPanelProps = {
  data?: unknown;
  title?: string;
};

export function JsonDebugPanel({
  data,
  title = COPY.common.rawPayload,
}: JsonDebugPanelProps) {
  const [open, setOpen] = useState(false);
  const masked = maskSensitivePayload(data);
  const json = JSON.stringify(masked, null, 2);

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(json);
      toast.success(COPY.common.jsonCopied);
    } catch {
      toast.error(COPY.errors.client);
    }
  }

  if (data === undefined) return null;

  return (
    <details
      className="rounded-lg border border-fz-border bg-fz-surface-2"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-fz-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fz-ink focus-visible:ring-offset-2">
        {title}
      </summary>
      <div className="space-y-2 border-t border-fz-border px-4 py-3">
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={copyJson}>
            {COPY.common.copyJson}
          </Button>
          <CopyButton
            value={json}
            label={COPY.common.copyJson}
            successMessage={COPY.common.jsonCopied}
          />
        </div>
        <pre className="max-h-64 overflow-auto rounded-md bg-fz-surface p-3 font-mono text-xs text-fz-ink-2">
          {json}
        </pre>
      </div>
    </details>
  );
}
