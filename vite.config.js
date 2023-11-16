import { defineConfig } from "vite";
export default defineConfig({
	appType: "mpa",
	server: {
		proxy: {
			"/trains": "http://localhost:3000"
		}
	}
});
