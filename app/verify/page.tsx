import { VerifyForm } from "@/components/forms/verify-form";
import { COPY } from "@/lib/copy";

export default function VerifyPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-fz-ink">{COPY.verify.title}</h1>
      <p className="mb-8 text-sm text-fz-ink-2">{COPY.verify.footer}</p>
      <VerifyForm />
      <p className="mt-8 text-xs text-fz-ink-3">{COPY.verify.disclosure}</p>
    </div>
  );
}
