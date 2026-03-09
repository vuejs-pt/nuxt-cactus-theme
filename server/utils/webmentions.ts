import * as fs from "node:fs";
import type {
	WebmentionsCache,
	WebmentionsChildren,
	WebmentionsFeed,
} from "../../types";

const CACHE_DIR = ".data";
const filePath = `${CACHE_DIR}/webmentions.json`;
const validWebmentionTypes = ["like-of", "mention-of", "in-reply-to"];

async function fetchWebmentions(
	domain: string,
	apiKey: string,
	timeFrom: string | null,
	perPage = 1000,
): Promise<WebmentionsFeed | null> {
	const hostName = new URL(domain).hostname;

	let url = `https://webmention.io/api/mentions.jf2?domain=${hostName}&token=${apiKey}&sort-dir=up&per-page=${perPage}`;
	if (timeFrom) url += `&since=${timeFrom}`;

	const res = await fetch(url);
	if (res.ok) {
		return (await res.json()) as WebmentionsFeed;
	}
	return null;
}

function mergeWebmentions(
	a: WebmentionsCache,
	b: WebmentionsFeed,
): WebmentionsChildren[] {
	return Array.from(
		[...a.children, ...b.children]
			.reduce(
				(map, obj) => map.set(obj["wm-id"], obj),
				new Map<number, WebmentionsChildren>(),
			)
			.values(),
	);
}

export function filterWebmentions(
	webmentions: WebmentionsChildren[],
): WebmentionsChildren[] {
	return webmentions.filter((wm) => {
		if (!validWebmentionTypes.includes(wm["wm-property"])) return false;
		if (
			wm["wm-property"] === "mention-of" ||
			wm["wm-property"] === "in-reply-to"
		) {
			return wm.content && wm.content.text !== "";
		}
		return true;
	});
}

function writeToCache(data: WebmentionsCache) {
	const fileContent = JSON.stringify(data, null, 2);
	if (!fs.existsSync(CACHE_DIR)) {
		fs.mkdirSync(CACHE_DIR, { recursive: true });
	}
	fs.writeFileSync(filePath, fileContent);
}

function getFromCache(): WebmentionsCache {
	if (fs.existsSync(filePath)) {
		const data = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(data);
	}
	return { lastFetched: null, children: [] };
}

let webMentions: WebmentionsCache | null = null;

async function getAndCacheWebmentions(
	domain: string,
	apiKey: string,
): Promise<WebmentionsCache> {
	const cache = getFromCache();
	const mentions = await fetchWebmentions(domain, apiKey, cache.lastFetched);

	if (mentions) {
		mentions.children = filterWebmentions(mentions.children);
		const result: WebmentionsCache = {
			lastFetched: new Date().toISOString(),
			children: mergeWebmentions(cache, mentions),
		};
		writeToCache(result);
		return result;
	}

	return cache;
}

export async function getWebmentionsForUrl(
	domain: string,
	apiKey: string,
	url: string,
): Promise<WebmentionsChildren[]> {
	if (!webMentions) {
		webMentions = await getAndCacheWebmentions(domain, apiKey);
	}
	return webMentions.children.filter((entry) => entry["wm-target"] === url);
}
