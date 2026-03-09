<script setup lang="ts">
import { sortByDate, getNormalizedTags, filterDrafts } from "../../data/post";

const route = useRoute();
const tag = route.params.tag as string;

const { data: allPosts } = await useAsyncData(`tag-${tag}`, () =>
	queryCollection("post").all(),
);

const { data: tagMeta } = await useAsyncData(`tag-meta-${tag}`, () =>
	queryCollection("tag").path(`/tags/${tag}`).first().catch(() => null),
	{ default: () => null },
);

const postsWithTag = computed(() =>
	sortByDate(
		filterDrafts(allPosts.value || []).filter((p) =>
			getNormalizedTags(p).includes(tag.toLowerCase()),
		),
	),
);

const pageTitle = computed(() => tagMeta.value?.title || `Posts about ${tag}`);

useSEO({
	title: pageTitle.value,
	description: tagMeta.value?.description ?? `View all posts with the tag - ${tag}`,
});
</script>

<template>
	<section>
		<nav class="mb-8" aria-label="Breadcrumbs">
			<ul class="flex items-center">
				<li class="flex items-center">
					<NuxtLink class="text-accent" to="/tags/">Tags</NuxtLink>
					<svg
						aria-hidden="true"
						class="mx-1.5 h-4 w-4"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
					</svg>
				</li>
				<li aria-current="page"><span aria-hidden="true">#</span>{{ tag }}</li>
			</ul>
		</nav>
		<h1 class="title capitalize">{{ pageTitle }}</h1>
		<div class="prose prose-sm prose-cactus mb-16 max-w-none">
			<p v-if="tagMeta?.description">{{ tagMeta.description }}</p>
			<ContentRenderer v-if="tagMeta?.body" :value="tagMeta" />
		</div>
		<ul class="space-y-4">
			<li
				v-for="p in postsWithTag"
				:key="p.path"
				class="grid gap-1 sm:grid-cols-[auto_1fr]"
			>
				<BlogPostPreview as="h2" :post="p" />
			</li>
		</ul>
	</section>
</template>
