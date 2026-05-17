"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentCard } from "@/components/cards/document-card";
import { api, ApiError } from "@/lib/api";
import { ACCEPTED_FILE_TYPES, DEMO_COMPANY_ID, MAX_UPLOAD_BYTES } from "@/lib/config";
import { COPY } from "@/lib/copy";
import type { Company, DocumentType, UploadResponse } from "@/lib/types";
import { toast } from "sonner";

const docTypes: DocumentType[] = [
  "certificate_of_origin",
  "quality_report",
  "purchase_order",
  "invoice",
  "packing_list",
  "other",
];

const schema = z.object({
  companyId: z.string().min(1),
  docType: z.enum([
    "certificate_of_origin",
    "quality_report",
    "purchase_order",
    "invoice",
    "packing_list",
    "other",
  ]),
  label: z.string().max(100).optional(),
  file: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Seleccione un archivo.")
    .refine((files) => {
      const file = files?.[0];
      if (!file) return false;
      return file.size <= MAX_UPLOAD_BYTES;
    }, COPY.upload.maxSize)
    .refine((files) => {
      const file = files?.[0];
      if (!file) return false;
      const ext = file.name.split(".").pop()?.toLowerCase();
      return ["pdf", "jpg", "jpeg", "png"].includes(ext ?? "");
    }, COPY.upload.invalidType),
});

type FormValues = {
  companyId: string;
  docType: DocumentType;
  label?: string;
  file: FileList;
};

type DocumentUploadFormProps = {
  companies: Company[];
};

export function DocumentUploadForm({ companies }: DocumentUploadFormProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [docType, setDocType] = useState<DocumentType>("certificate_of_origin");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyId: DEMO_COMPANY_ID,
      docType: "certificate_of_origin",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    const file = values.file[0];
    const form = new FormData();
    form.append("file", file);
    form.append("companyId", values.companyId);
    form.append("docType", values.docType);
    if (values.label) form.append("label", values.label);

    try {
      const res = await api.uploadDocument(form);
      setResult(res);
      toast.success(COPY.upload.success);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : COPY.errors.network;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8" data-testid="upload-page">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="space-y-2">
          <Label htmlFor="field-company-id">{COPY.upload.companyField}</Label>
          <Select
            defaultValue={DEMO_COMPANY_ID}
            onValueChange={(v) => setValue("companyId", v ?? DEMO_COMPANY_ID)}
          >
            <SelectTrigger id="field-company-id" className="min-h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {companies.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" {...register("companyId")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="field-doc-type">{COPY.upload.docTypeField}</Label>
          <Select
            value={docType}
            onValueChange={(v) => {
              setDocType(v as DocumentType);
              setValue("docType", v as DocumentType);
            }}
          >
            <SelectTrigger id="field-doc-type" className="min-h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {docTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {COPY.docType[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" {...register("docType")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="field-label">{COPY.upload.labelField}</Label>
          <Input id="field-label" maxLength={100} {...register("label")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="field-file">{COPY.upload.fileField}</Label>
          <Input
            id="field-file"
            type="file"
            accept={ACCEPTED_FILE_TYPES}
            className="min-h-11"
            aria-invalid={!!errors.file}
            aria-describedby={errors.file ? "file-error" : undefined}
            {...register("file")}
          />
          {errors.file ? (
            <p id="file-error" className="text-sm text-fz-blocked" role="alert">
              {errors.file.message as string}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={loading}
          data-testid="submit-upload"
          className="min-h-11 bg-fz-brand text-white hover:bg-fz-brand-hover"
        >
          {COPY.upload.submit}
        </Button>
      </form>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : null}

      {result ? (
        <DocumentCard
          docType={result.docType}
          docHash={result.docHash}
          txHash={result.txHash}
          avalancheExplorer={result.avalancheExplorer}
          registeredAt={result.registeredAt}
        />
      ) : null}
    </div>
  );
}
