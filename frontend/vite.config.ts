import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on all local IPs (0.0.0.0) so Fire TV devices can connect directly
    port: 5173,
    strictPort: false, // fallback to next port (e.g. 5174) if 5173 is busy
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    target: ["es2018", "chrome80"],
  },
});
