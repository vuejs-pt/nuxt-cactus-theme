import { getWebmentionsForUrl } from "../utils/webmentions";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const apiKey = config.webmentionApiKey;
	const domain = config.public.webmentionUrl;

	if (!apiKey || !domain) {
		return { children: [] };
	}

	const query = getQuery(event);
	const targetUrl = query.url as string;

	if (!targetUrl) {
		throw createError({ statusCode: 400, message: "Missing url parameter" });
	}

	const mentions = await getWebmentionsForUrl(domain, apiKey, targetUrl);
	return { children: mentions };
});
