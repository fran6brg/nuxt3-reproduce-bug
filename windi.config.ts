import { defineConfig } from "windicss/helpers";

export default defineConfig({
	darkMode: "class",
	attributify: true,
	theme: {
		screens: {
			"<xs": { max: "360px" },
			"xs": "360px",
			"<sm": { max: "450px" },
			"sm": "450px",
			"<md": { max: "680px" },
			"md": "680px",
			"<lg": { max: "950px" },
			"lg": "950px",
			"<xl": { max: "1440px" },
			"xl": "1440px",
			"<2xl": { max: "1600px" },
			"2xl": "1600px",
		},
	},
});
