/// <reference types="react-scripts" />

interface ChatbaseFunction {
  (...args: unknown[]): unknown;
  q?: unknown[][];
}

interface Window {
  chatbase?: ChatbaseFunction;
}
