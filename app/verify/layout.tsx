import type { Metadata } from "next";
import { MinimalHeader } from "@/components/layout/minimal-header";
import { COPY } from "@/lib/copy";

export const metadata: Metadata = {
  title: COPY.verify.title,
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MinimalHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </>
  );
}
