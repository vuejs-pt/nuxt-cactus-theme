import type { SiteMeta } from "../types";

export const useSEO = (meta: SiteMeta) => {
	const { siteConfig } = useAppConfig();
	const route = useRoute();

	const titleSeparator = "•";
	const siteTitle = `${meta.title} ${titleSeparator} ${siteConfig.title}`;
	const description = meta.description || siteConfig.description;
	const canonicalURL = `${siteConfig.url}${route.path}`;
	const socialImageURL = meta.ogImage
		? `${siteConfig.url}${meta.ogImage}`
		: `${siteConfig.url}/social-card.png`;

	useHead({
		title: siteTitle,
		link: [
			{ rel: "canonical", href: canonicalURL },
			{ rel: "icon", type: "image/svg+xml", href: "/icon.svg" },
			{ rel: "manifest", href: "/manifest.webmanifest" },
		],
	});

	useSeoMeta({
		title: siteTitle,
		description,
		author: siteConfig.author,
		ogType: meta.articleDate ? "article" : "website",
		ogTitle: meta.title,
		ogDescription: description,
		ogUrl: canonicalURL,
		ogSiteName: siteConfig.title,
		ogLocale: siteConfig.ogLocale,
		ogImage: socialImageURL,
		ogImageWidth: 1200,
		ogImageHeight: 630,
		twitterCard: "summary_large_image",
		twitterTitle: meta.title,
		twitterDescription: description,
		twitterImage: socialImageURL,
	});

	if (meta.articleDate) {
		useSeoMeta({
			articleAuthor: siteConfig.author,
			articlePublishedTime: meta.articleDate,
		});
	}
};
