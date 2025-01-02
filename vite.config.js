// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   // plugins: [react(), tailwindcss("./tailwindConfig.config.js")],
//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [
//         require('tailwindcss'), // Ensure Tailwind CSS is imported via require
//         require('autoprefixer'),
//       ],
//     },
//   },

// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  server: {
    proxy: {
      // Proxy all requests starting with '/api' to your backend
      '/api': {
        target: 'https://backendtokomesin.grhapengharapan.org', // Your backend URL
        changeOrigin: true, // Modify the origin of the request to match the target
        secure: true, // If the backend uses HTTPS, set to true
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix before forwarding
      },
    },
  },
});

