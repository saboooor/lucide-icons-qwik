import { qwikVite } from "@qwik.dev/core/optimizer";
import { qwikRouter } from "@qwik.dev/router/vite";
import { defineConfig, type UserConfig } from "vite";
import pkg from "./package.json";

const { dependencies = {}, peerDependencies = {} } = pkg as any;
const makeRegex = (dep: string) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj: Record<string, unknown>) => Object.keys(obj).map(makeRegex);

export default defineConfig((): UserConfig => {
  return {
    resolve: {
      tsconfigPaths: true,
    },
    build: {
      outDir: "lib",
      target: "es2020",
      lib: {
        entry: "./src/index",
        formats: ["es", "cjs"] as const,
        // This adds .qwik so all files are processed by the optimizer
        fileName: (format, entryName) =>
          `${entryName}.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: "src",
        },
        // externalize deps that shouldn't be bundled into the library
        external: [
          /^node:.*/,
          ...excludeAll(dependencies),
          ...excludeAll(peerDependencies),
        ],
      },
    },
    plugins: [qwikVite(), qwikRouter()],
  };
});
