export interface SiteConfig {
	author: string;
	date: {
		locale: string | string[] | undefined;
		options: Intl.DateTimeFormatOptions;
	};
	description: string;
	lang: string;
	ogLocale: string;
	title: string;
	url: string;
}

export interface MenuLink {
	path: string;
	title: string;
}

export interface PaginationLink {
	srLabel?: string;
	text?: string;
	url: string;
}

export interface SiteMeta {
	articleDate?: string | undefined;
	description?: string;
	ogImage?: string | undefined;
	title: string;
}

export type AdmonitionType = "tip" | "note" | "important" | "caution" | "warning";

/** Webmentions */
export interface WebmentionsFeed {
	children: WebmentionsChildren[];
	name: string;
	type: string;
}

export interface WebmentionsCache {
	children: WebmentionsChildren[];
	lastFetched: null | string;
}

export interface WebmentionsChildren {
	author: WebmentionAuthor | null;
	content?: WebmentionContent | null;
	"mention-of": string;
	name?: null | string;
	photo?: null | string[];
	published?: null | string;
	rels?: { canonical: string } | null;
	summary?: { "content-type": string; value: string } | null;
	syndication?: null | string[];
	type: string;
	url: string;
	"wm-id": number;
	"wm-private": boolean;
	"wm-property": string;
	"wm-protocol": string;
	"wm-received": string;
	"wm-source": string;
	"wm-target": string;
}

export interface WebmentionAuthor {
	name: string;
	photo: string;
	type: string;
	url: string;
}

export interface WebmentionContent {
	"content-type": string;
	html: string;
	text: string;
	value: string;
}

declare module "nuxt/schema" {
	interface AppConfigInput {
		siteConfig?: Partial<SiteConfig>;
		menuLinks?: MenuLink[];
	}
}
