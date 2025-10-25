import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 3003,
    allowedHosts: [
      "basirah360.com",
      "www.basirah360.com",
      "dashboard.basirah360.com",
      "app.basirah360.com",
      "localhost",
    ],
  },
  preview: {
    host: "0.0.0.0",
    port: 3003,
    allowedHosts: [
      "basirah360.com",
      "www.basirah360.com",
      "dashboard.basirah360.com",
      "app.basirah360.com",
      "localhost",
    ],
  },
})