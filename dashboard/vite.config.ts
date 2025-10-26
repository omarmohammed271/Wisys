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
      "digiations360.com",
      "www.digiations360.com",
      "app.digiations360.com",
      "app.digiations360.com",
      "localhost",
    ],
  },
  preview: {
    host: "0.0.0.0",
    port: 3003,
    allowedHosts: [
      "digiations360.com",
      "www.digiations360.com",
      "app.digiations360.com",
      "app.digiations360.com",
      "localhost",
    ],
  },
})