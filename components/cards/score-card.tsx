"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBar } from "@/components/shared/score-bar";
import { COPY, translateNarrative } from "@/lib/copy";
import type { Score } from "@/lib/types";
import { formatScore, scoreTextColor, cn } from "@/lib/utils";

type ScoreCardProps = {
  companyName?: string;
  score?: Score;
  rationale?: string;
};

export function ScoreCard({
  companyName,
  score,
  rationale,
}: ScoreCardProps) {
  const [expanded, setExpanded] = useState(false);
  const translated = translateNarrative(rationale, companyName);
  const showToggle = translated.length > 240;

  return (
    <Card className="border-fz-border bg-fz-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <CardHeader>
        <CardTitle className="text-fz-ink">
          {companyName ?? COPY.scores.overall}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScoreBar
          label={COPY.scores.compliance}
          value={score?.compliance ?? 0}
          axis="trust"
        />
        <ScoreBar
          label={COPY.scores.risk}
          value={score?.risk ?? 0}
          axis="risk"
        />
        <ScoreBar
          label={COPY.scores.trust}
          value={score?.trust ?? 0}
          axis="trust"
        />
        <p
          className={cn(
            "font-mono text-3xl font-semibold",
            scoreTextColor(score?.overall ?? 0, "trust")
          )}
        >
          {formatScore(score?.overall ?? 0)}
        </p>
        {rationale ? (
          <div className="text-sm text-fz-ink-2">
            <p className={expanded ? "" : "line-clamp-3"}>{translated}</p>
            {showToggle ? (
              <button
                type="button"
                className="mt-2 text-sm font-medium text-fz-ink underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fz-ink focus-visible:ring-offset-2"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "Ver menos" : "Ver más"}
              </button>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
