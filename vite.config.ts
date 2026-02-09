import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],

    css: {
        modules: {
            generateScopedName: "[name]_[local]__[hash:base64:5]",
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
    build: {
        chunkSizeWarningLimit: 1500,
    },
});
