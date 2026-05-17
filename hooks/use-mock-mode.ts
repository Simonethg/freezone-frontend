"use client";

import { useSyncExternalStore } from "react";
import { getMockMode, subscribeMockMode } from "@/lib/mock-mode";

export function useMockMode(): boolean {
  return useSyncExternalStore(
    subscribeMockMode,
    getMockMode,
    () => false
  );
}
