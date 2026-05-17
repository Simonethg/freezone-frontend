import type { Metadata } from "next";
import { DemoFlow } from "@/components/demo/demo-flow";
import { COPY } from "@/lib/copy";

export const metadata: Metadata = {
  title: COPY.nav.demo,
};

export default function DemoPage() {
  return <DemoFlow />;
}
