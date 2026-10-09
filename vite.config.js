import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/typing-speed-practice/",
    build: { sourcemap: false },
    plugins: [react()],
});
