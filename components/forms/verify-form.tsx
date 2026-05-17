"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COPY } from "@/lib/copy";
import { HASH_PATTERN } from "@/lib/utils";

const schema = z.object({
  hash: z
    .string()
    .min(4, "Ingrese un hash válido.")
    .regex(HASH_PATTERN, "Formato de hash no válido."),
});

type FormValues = z.infer<typeof schema>;

export function VerifyForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const errorId = "verify-hash-error";

  function onSubmit(values: FormValues) {
    router.push(`/verify/${encodeURIComponent(values.hash.trim())}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      data-testid="verify-page"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="verify-hash">{COPY.verify.hashLabel}</Label>
        <Input
          id="verify-hash"
          placeholder={COPY.verify.hashPlaceholder}
          aria-invalid={!!errors.hash}
          aria-describedby={errors.hash ? errorId : undefined}
          className="font-mono"
          {...register("hash")}
        />
        {errors.hash ? (
          <p id={errorId} className="text-sm text-fz-blocked" role="alert">
            {errors.hash.message}
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        className="min-h-11 w-full bg-fz-ink text-white hover:bg-fz-ink/90 sm:w-auto"
      >
        {COPY.verify.submit}
      </Button>
    </form>
  );
}
