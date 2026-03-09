import type { Collections } from "#content";

type Post = Collections["post"];

export function filterDrafts(posts: Post[]): Post[] {
	if (import.meta.dev) return posts;
	return posts.filter((p) => !p.draft);
}

export function groupPostsByYear(posts: Post[]) {
	const grouped: Record<string, Post[]> = {};
	for (const post of posts) {
		const year = new Date(post.publishDate).getFullYear().toString();
		if (!grouped[year]) grouped[year] = [];
		grouped[year]!.push(post);
	}
	return grouped;
}

export function getNormalizedTags(post: Post): string[] {
	return [...new Set((post.tags || []).map((t) => t.toLowerCase()))];
}

export function getAllTags(posts: Post[]) {
	return posts.flatMap((post) => getNormalizedTags(post));
}

export function getUniqueTags(posts: Post[]) {
	return [...new Set(getAllTags(posts))];
}

export function getUniqueTagsWithCount(posts: Post[]): [string, number][] {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}

export function sortByDate(posts: Post[]) {
	return [...posts].sort(
		(a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
	);
}
