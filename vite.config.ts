import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@components": path.resolve(__dirname, "src/components"),
            "@context": path.resolve(__dirname, "src/context"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@services": path.resolve(__dirname, "src/services"),
            "@assets": path.resolve(__dirname, "src/assets"),

        },
    },
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
});
