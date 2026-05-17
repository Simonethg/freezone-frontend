"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: COPY.nav.dashboard },
  { href: "/demo", label: COPY.nav.demo },
  { href: "/upload", label: COPY.nav.upload },
  { href: "/payments", label: COPY.nav.payments },
  { href: "/verify", label: COPY.nav.verify },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-fz-border bg-fz-surface">
      <nav
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6"
        aria-label="Navegación principal"
      >
        <Logo />
        <ul className="flex flex-wrap items-center gap-1">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fz-ink focus-visible:ring-offset-2",
                    active
                      ? "bg-fz-brand text-white"
                      : "text-fz-ink-2 hover:bg-fz-surface-2 hover:text-fz-ink"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
