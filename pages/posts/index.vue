<script setup lang="ts">
import { sortByDate, getUniqueTags, groupPostsByYear, filterDrafts } from "../../data/post";

useSEO({
	title: "Posts",
	description: "Read my collection of posts and the things that interest me",
});

const { data: allPosts } = await useAsyncData("all-posts", () =>
	queryCollection("post").all(),
);

const sortedPosts = computed(() => sortByDate(filterDrafts(allPosts.value || [])));
const pinnedPosts = computed(() => sortedPosts.value.filter((p) => p.pinned).slice(0, 3));
const uniqueTags = computed(() => getUniqueTags(sortedPosts.value).slice(0, 7));
const groupedByYear = computed(() => groupPostsByYear(sortedPosts.value));
const descYearKeys = computed(() =>
	Object.keys(groupedByYear.value).sort((a, b) => +b - +a),
);
</script>

<template>
	<section>
		<div class="mb-12 flex items-center gap-3">
			<h1 class="title">Posts</h1>
			<a class="text-accent" href="/rss.xml" target="_blank">
				<span class="sr-only">RSS feed</span>
				<svg
					aria-hidden="true"
					class="h-6 w-6"
					fill="currentColor"
					focusable="false"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"
					/>
				</svg>
			</a>
		</div>
		<div class="grid sm:grid-cols-[3fr_1fr] sm:gap-x-8 sm:gap-y-16">
			<div>
				<section v-if="pinnedPosts.length > 0" class="mb-16">
					<h2 class="title mb-6 text-xl">Pinned Posts</h2>
					<ul class="space-y-4" role="list">
						<li
							v-for="p in pinnedPosts"
							:key="p.path"
							class="grid gap-1 sm:grid-cols-[auto_1fr]"
						>
							<BlogPostPreview :post="p" />
						</li>
					</ul>
				</section>
				<section v-for="yearKey in descYearKeys" :key="yearKey" class="mb-16">
					<h2 :id="`year-${yearKey}`" class="title text-lg">
						<span class="sr-only">Posts in</span>
						{{ yearKey }}
					</h2>
					<ul class="mt-5 space-y-4 text-start">
						<li
							v-for="p in groupedByYear[yearKey]"
							:key="p.path"
							class="grid gap-1 sm:grid-cols-[auto_1fr] sm:[&_q]:col-start-2"
						>
							<BlogPostPreview :post="p" />
						</li>
					</ul>
				</section>
			</div>
			<aside v-if="uniqueTags.length">
				<h2 class="title mb-4 flex items-center gap-2 text-lg">
					Tags
					<svg
						aria-hidden="true"
						class="h-6 w-6"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M0 0h24v24H0z" fill="none" stroke="none" />
						<path
							d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l6.116 6.116a2.025 2.025 0 0 0 2.864 0l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-6.117 -6.116a2.025 2.025 0 0 0 -1.431 -.593z"
						/>
						<path d="M17.573 18.407l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-7.117 -7.116" />
						<path d="M6 9h-.01" />
					</svg>
				</h2>
				<ul class="flex flex-wrap gap-2">
					<li v-for="tag in uniqueTags" :key="tag">
						<NuxtLink
							class="cactus-link flex items-center justify-center"
							:to="`/tags/${tag}/`"
						>
							<span aria-hidden="true">#</span>
							<span class="sr-only">View all posts with the tag</span>
							{{ tag }}
						</NuxtLink>
					</li>
				</ul>
				<span class="mt-4 block sm:text-end">
					<NuxtLink class="hover:text-link" to="/tags/">
						View all <span aria-hidden="true">→</span>
						<span class="sr-only">blog tags</span>
					</NuxtLink>
				</span>
			</aside>
		</div>
	</section>
</template>
