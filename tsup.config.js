import { defineConfig } from "tsup"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  dts: true,
  format: ['cjs', "esm"]
})
