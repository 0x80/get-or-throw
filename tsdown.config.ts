import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["esm", "cjs"],
  target: "node20",
  sourcemap: true,
  dts: true,
  clean: true,
});
