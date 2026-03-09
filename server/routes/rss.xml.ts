import { Feed } from "feed";

export default defineEventHandler(async (event) => {
	const { siteConfig } = useAppConfig();
	const posts = await queryCollection(event, "post").all();

	const publishedPosts = posts
		.filter((p) => !p.draft)
		.sort(
			(a, b) =>
				new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
		);

	const feed = new Feed({
		title: siteConfig.title,
		description: siteConfig.description,
		id: siteConfig.url,
		link: siteConfig.url,
		language: siteConfig.lang,
		copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author}`,
		author: {
			name: siteConfig.author,
		},
	});

	for (const post of publishedPosts) {
		const url = `${siteConfig.url}${post.path}`;

		feed.addItem({
			title: post.title,
			id: url,
			link: url,
			description: post.description,
			date: new Date(post.publishDate),
			...(post.updatedDate && { updated: new Date(post.updatedDate) }),
			author: [{ name: siteConfig.author }],
			category: (post.tags || []).map((tag) => ({ name: tag })),
		});
	}

	setResponseHeader(event, "content-type", "application/xml; charset=utf-8");
	return feed.rss2();
});
