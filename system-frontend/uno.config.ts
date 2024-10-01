import { defineConfig, presetIcons, presetUno, presetWind } from "unocss";

export default defineConfig({
	// theme: {
		
	// }
	presets: [
		presetWind(),
		presetUno(),
		presetIcons()
	]
})