"use client";

import { Logo } from "@/components/brand/logo";
import { MockModeBadge } from "@/components/layout/mock-mode-badge";

export function MinimalHeader() {
  return (
    <header className="border-b border-fz-border bg-fz-surface px-4 py-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
        <Logo />
        <MockModeBadge />
      </div>
    </header>
  );
}
