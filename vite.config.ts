import { defineConfig } from "vite";
export default defineConfig({
	appType: "mpa",
	server: {
		proxy: {
			"/api": "http://localhost:3000"
		}
	}
});
