import type { Metadata } from "next";
import { DocumentUploadForm } from "@/components/forms/document-upload-form";
import { api } from "@/lib/api";
import { COPY } from "@/lib/copy";

export const metadata: Metadata = {
  title: COPY.nav.upload,
};

export default async function UploadPage() {
  let companies: Awaited<ReturnType<typeof api.demoState>>["companies"] = [];
  try {
    const state = await api.demoState();
    companies = state.companies ?? [];
  } catch {
    companies = [];
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-2xl font-bold text-fz-ink">{COPY.upload.title}</h1>
      <DocumentUploadForm companies={companies} />
    </div>
  );
}
