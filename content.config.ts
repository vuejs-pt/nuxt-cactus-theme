import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const post = defineCollection({
	type: "page",
	source: "posts/**/*.md",
	schema: z.object({
		title: z.string().max(60),
		description: z.string(),
		coverImage: z
			.object({
				alt: z.string(),
				src: z.string(),
			})
			.optional(),
		draft: z.boolean().default(false),
		ogImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		publishDate: z.string(),
		updatedDate: z.string().optional(),
		pinned: z.boolean().default(false),
	}),
});

const note = defineCollection({
	type: "page",
	source: "notes/**/*.md",
	schema: z.object({
		title: z.string().max(60),
		description: z.string().optional(),
		publishDate: z.string(),
	}),
});

const tag = defineCollection({
	type: "page",
	source: "tags/**/*.md",
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
	}),
});

export default defineContentConfig({
	collections: {
		post,
		note,
		tag,
	},
});
