import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { COPY } from "@/lib/copy";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "compact" | "lockup";
  className?: string;
};

export function Logo({ variant = "compact", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fz-brand focus-visible:ring-offset-2",
        className
      )}
      aria-label={`${COPY.brand.name} — ${COPY.brand.signature}`}
    >
      <Image
        src={BRAND.assets.isotipo}
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0"
        priority
      />
      {variant === "lockup" ? (
        <Image
          src={BRAND.assets.lockupHorizontal}
          alt={COPY.brand.name}
          width={220}
          height={40}
          className="hidden h-9 w-auto sm:block"
        />
      ) : (
        <span
          className="hidden font-bold tracking-[var(--fz-logo-tracking)] sm:inline text-lg"
          style={{ letterSpacing: BRAND.typography.logoLetterSpacing }}
        >
          <span className="text-fz-ink">Free</span>
          <span className="text-fz-brand">Zone</span>
        </span>
      )}
    </Link>
  );
}
