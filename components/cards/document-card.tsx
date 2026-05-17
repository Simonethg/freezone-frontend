import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HashChip } from "@/components/shared/hash-chip";
import { COPY } from "@/lib/copy";
import type { DocumentType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type DocumentCardProps = {
  docType?: DocumentType | string;
  label?: string;
  docHash?: string;
  txHash?: string;
  avalancheExplorer?: string;
  registeredAt?: string;
};

export function DocumentCard({
  docType,
  label,
  docHash,
  txHash,
  avalancheExplorer,
  registeredAt,
}: DocumentCardProps) {
  const typeLabel =
    COPY.docType[docType as keyof typeof COPY.docType] ??
    docType ??
    COPY.common.notAvailable;

  return (
    <Card className="border-fz-border bg-fz-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <CardHeader className="flex flex-row flex-wrap items-center gap-2">
        <Badge variant="outline" className="border-fz-border">
          {typeLabel}
        </Badge>
        {label ? (
          <CardTitle className="text-base text-fz-ink">{label}</CardTitle>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3">
        {docHash ? (
          <HashChip hash={docHash} label="docHash" />
        ) : null}
        {txHash ? (
          <HashChip
            hash={txHash}
            label="txHash"
            href={avalancheExplorer}
          />
        ) : null}
        <Badge className="bg-fz-chain-soft text-fz-chain hover:bg-fz-chain-soft">
          {COPY.common.avalancheNetwork}
        </Badge>
      </CardContent>
      {registeredAt ? (
        <CardFooter className="text-sm text-fz-ink-3">
          {formatDate(registeredAt)}
        </CardFooter>
      ) : null}
    </Card>
  );
}
