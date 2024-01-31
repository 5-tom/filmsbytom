import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "react.html")
			}
		}
	},
	plugins: [react()],
	server: {
		proxy: {
			"/api": "http://localhost:3000"
		}
	}
});
