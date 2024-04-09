import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import jsconfigPaths from "vite-jsconfig-paths";

import { VitePWA } from "vite-plugin-pwa";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		jsconfigPaths(),
		// https://www.saurabhmisra.dev/setup-react-pwa-using-vite/
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
			manifest: {
				name: "Transporter PWA Project",
				short_name: "Transporter PWA Project",
				theme_color: "#ffffff",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
	],
});
