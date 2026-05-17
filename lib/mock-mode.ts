/** Tracks whether the client is serving deterministic mock API data. */

let mockModeActive = false;
const listeners = new Set<() => void>();

export function getMockMode(): boolean {
  return mockModeActive;
}

export function setMockMode(active: boolean): void {
  if (mockModeActive === active) return;
  mockModeActive = active;
  listeners.forEach((listener) => listener());
}

export function subscribeMockMode(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
