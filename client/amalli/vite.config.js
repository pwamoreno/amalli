import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname("./src"), "./src"),
    },
  },
  // server: {
  //   allowedHosts: [
  //     "ee269cc50ead.ngrok-free.app", // Allow all localtunnel hosts
  //     ".ngrok.io", // Also allow ngrok if you switch
  //     ".trycloudflare.com", // Also allow Cloudflare tunnel
  //   ],
  // },
});
