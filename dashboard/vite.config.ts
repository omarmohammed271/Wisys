import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: "http://basirah-360.com/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    allowedHosts: ["basirah-360.com"],
  },
  preview: {
    allowedHosts: ["basirah-360.com"],
  },
})