import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      reporter: ["text", "lcov"],
      include: ["hooks/**/*.{ts,tsx}", "utils/**/*.ts"],
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});


