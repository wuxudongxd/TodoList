import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
   resolve: {
   alias: {
     "Api": path.resolve(__dirname, "src/api"),
     "Components": path.resolve(__dirname, "src/components"),
     "Hooks": path.resolve(__dirname, "src/hooks"),
     "Statics": path.resolve(__dirname, "src/statics"),
     "Store": path.resolve(__dirname, "src/store"),
     "Utils": path.resolve(__dirname, "src/utils"),
     "Views": path.resolve(__dirname, "src/views"),
   },
 },
  plugins: [vue()],
});
