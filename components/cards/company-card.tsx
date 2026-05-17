import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBar } from "@/components/shared/score-bar";
import { StatusBadge } from "@/components/shared/status-badge";
import { COPY } from "@/lib/copy";
import type { Company } from "@/lib/types";
import { getCountryFlag } from "@/lib/utils";

type CompanyCardProps = {
  company: Company;
};

export function CompanyCard({ company }: CompanyCardProps) {
  const typeLabel =
    COPY.companyType[company?.type as keyof typeof COPY.companyType] ??
    COPY.common.notAvailable;
  const feminine = company?.type === "supplier" || company?.type === "manufacturer" || company?.type === "distributor";

  return (
    <Card className="border-fz-border bg-fz-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="text-lg" aria-hidden="true">
            {getCountryFlag(company?.country ?? "")}
          </p>
          <CardTitle className="text-lg text-fz-ink">
            {company?.name ?? COPY.common.notAvailable}
          </CardTitle>
          <p className="text-sm text-fz-ink-3">{typeLabel}</p>
        </div>
        <StatusBadge
          status={company?.status ?? "pending"}
          feminine={feminine && company?.status === "blocked"}
        />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-fz-ink-2">
          {company?.description ?? COPY.common.notAvailable}
        </p>
      </CardContent>
      <CardFooter>
        <ScoreBar
          label={COPY.scores.overall}
          value={company?.score?.overall ?? 0}
          axis="trust"
        />
      </CardFooter>
    </Card>
  );
}
