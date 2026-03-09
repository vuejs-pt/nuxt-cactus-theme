<script setup lang="ts">
import { getUniqueTagsWithCount, filterDrafts } from "../../data/post";

useSEO({
	title: "All Tags",
	description: "A list of all the topics I've written about in my posts",
});

const { data: allPosts } = await useAsyncData("tags-posts", () =>
	queryCollection("post").all(),
);

const allTags = computed(() => getUniqueTagsWithCount(filterDrafts(allPosts.value || [])));
</script>

<template>
	<section>
		<h1 class="title mb-6">Tags</h1>
		<ul class="space-y-4">
			<li v-for="[tag, count] in allTags" :key="tag" class="flex items-center gap-x-2">
				<NuxtLink
					class="cactus-link inline-block"
					:to="`/tags/${tag}/`"
					:title="`View posts with the tag: ${tag}`"
				>
					&#35;{{ tag }}
				</NuxtLink>
				<span class="inline-block">
					- {{ count }} Post{{ count > 1 ? "s" : "" }}
				</span>
			</li>
		</ul>
	</section>
</template>
