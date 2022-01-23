import { defineConfig } from "vite";
import path from "path";
import svgLoader from "vite-svg-loader";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [vue(), svgLoader()],
});
