export default defineAppConfig({
	siteConfig: {
		author: "Rui Posse",
		date: {
			locale: "en-GB" as string | string[] | undefined,
			options: {
				day: "numeric" as const,
				month: "short" as const,
				year: "numeric" as const,
			},
		},
		description: "An opinionated starter theme for Nuxt",
		lang: "en-GB",
		ogLocale: "en_GB",
		title: "Nuxt Cactus",
		url: "https://ruiposse.com",
	},
	menuLinks: [
		{ path: "/", title: "Home" },
		{ path: "/about/", title: "About" },
		{ path: "/posts/", title: "Blog" },
		{ path: "/projects/", title: "Projects" },
		{ path: "/notes/", title: "Notes" },
	],
	projects: [] as { name: string; url: string; desc: string }[],
	codeConfig: {
		borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		themes: {
			dark: "dracula",
			light: "github-light",
		},
	},
});
