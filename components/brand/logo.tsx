import Link from "next/link";
import { COPY } from "@/lib/copy";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold text-fz-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fz-ink focus-visible:ring-offset-2"
    >
      <span
        className="flex size-8 items-center justify-center rounded-lg bg-fz-ink text-sm text-white"
        aria-hidden="true"
      >
        FZ
      </span>
      <span className="hidden sm:inline">{COPY.brand.name}</span>
    </Link>
  );
}
