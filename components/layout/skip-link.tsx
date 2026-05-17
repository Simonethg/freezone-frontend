import { COPY } from "@/lib/copy";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fz-ink focus:px-4 focus:py-2 focus:text-white focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      {COPY.nav.skipToMain}
    </a>
  );
}
