import { TopNav } from "@/components/layout/top-nav";
import { COPY } from "@/lib/copy";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-fz-border bg-fz-surface py-6 text-center text-sm text-fz-ink-3">
        <p>
          © {new Date().getFullYear()} {COPY.brand.fullName}
        </p>
      </footer>
    </>
  );
}
