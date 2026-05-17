import { Logo } from "@/components/brand/logo";

export function MinimalHeader() {
  return (
    <header className="border-b border-fz-border bg-fz-surface px-4 py-4">
      <div className="mx-auto max-w-2xl">
        <Logo />
      </div>
    </header>
  );
}
