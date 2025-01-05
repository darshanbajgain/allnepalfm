import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Base src alias
      "@assets": path.resolve(__dirname, "./src/assets"), // Alias for assets
      "@components": path.resolve(__dirname, "./src/components"), // Alias for components
      "@hooks": path.resolve(__dirname, "./src/hooks"), // Alias for hooks
      "@store": path.resolve(__dirname, "./src/store"), // Alias for store
      "@lib": path.resolve(__dirname, "./src/lib"), // Alias for utilities
      "@pages": path.resolve(__dirname, "./src/pages"), // Alias for Pages
      "@layouts": path.resolve(__dirname, "./src/layouts"), // Alias for Layouts
    },
  },
});
