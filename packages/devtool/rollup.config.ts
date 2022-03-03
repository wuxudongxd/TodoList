import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import packageJson from "./package.json";

const extensions = [".js", ".ts"];

/**
 * Configuration for the ESM build.
 */
const buildEsm = {
  input: [
    // Split modules so they can be tree-shaken.
    "src/index.ts",
  ],
  external: ["localforage", "msw"],
  output: {
    format: "esm",
    entryFileNames: "[name].js",
    chunkFileNames: "[name]-deps.js",
    dir: path.dirname(packageJson.module),
    sourcemap: true,
  },
  plugins: [
    json(),
    resolve({
      preferBuiltins: false,
      mainFields: ["module", "main", "jsnext:main"],
      extensions,
    }),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
  ],
};

/**
 * Configuration for the CJS build.
 */
const buildCjs = {
  input: ["src/index.ts"],
  external: ["localforage", "msw"],
  output: {
    format: "cjs",
    dir: path.dirname(packageJson.main),
    exports: "named",
    sourcemap: true,
  },
  plugins: [
    json(),
    resolve({
      preferBuiltins: false,
      extensions,
    }),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
  ],
};

export default [buildCjs, buildEsm];
