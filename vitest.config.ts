import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      reporter: ["text", "lcov"],
      include: ["hooks/**/*.{ts,tsx}", "utils/**/*.ts", "components/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
      exclude: ["**/__tests__/**", "**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});