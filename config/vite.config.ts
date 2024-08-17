import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslintPlugin({
    eslintOptions: {
      overrideConfigFile: './config/.eslintrc.cjs',
    },
  })],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "../src"),
    },
  },
  root: path.resolve(__dirname, '..')
});
