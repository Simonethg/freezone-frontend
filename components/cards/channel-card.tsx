import { Route } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COPY } from "@/lib/copy";
import type { Channel } from "@/lib/types";

type ChannelCardProps = {
  channel: Channel;
};

export function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <Card className="border-fz-border bg-fz-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <CardHeader className="flex flex-row items-start gap-3 pb-2">
        <div
          className="flex size-10 items-center justify-center rounded-lg bg-fz-surface-2 text-fz-ink"
          aria-hidden="true"
        >
          <Route className="size-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-fz-ink-2">
            {COPY.channel.title}
          </p>
          <CardTitle className="text-xl text-fz-ink">
            {channel?.name ?? COPY.common.notAvailable}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-fz-ink-2">
          {channel?.description ?? COPY.common.notAvailable}
        </p>
      </CardContent>
    </Card>
  );
}
