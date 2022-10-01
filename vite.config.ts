/* eslint-disable import/no-default-export */
import { defineConfig } from "vitest/config";

export default defineConfig({
  server: {
   port: 3000
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
