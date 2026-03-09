<script setup lang="ts">
import { getReadingTime } from "../../utils/readingTime";
import { getTocFromBody } from "../../utils/toc";

const route = useRoute();

const { data: post } = await useAsyncData(`post-${route.path}`, () =>
	queryCollection("post").path(route.path).first(),
);

if (!post.value) {
	throw createError({ statusCode: 404, message: "Post not found" });
}

const readingTime = computed(() => (post.value?.body ? getReadingTime(post.value.body) : ""));
const tocHeadings = computed(() => (post.value?.body ? getTocFromBody(post.value.body) : []));

const { siteConfig } = useAppConfig();

useSEO({
	title: post.value.title,
	description: post.value.description,
	ogImage: post.value.ogImage,
	articleDate: new Date(post.value.publishDate).toISOString(),
});

const postUrl = computed(() => `${siteConfig.url}${route.path}`);

const showTopBtn = ref(false);

function scrollToTop() {
	document.documentElement.scrollTo({ behavior: "smooth", top: 0 });
}

onMounted(() => {
	const target = document.getElementById("blog-hero");
	if (!target) return;
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			showTopBtn.value = !entry.isIntersecting;
		});
	});
	observer.observe(target);
	onUnmounted(() => observer.disconnect());
});
</script>

<template>
	<article v-if="post" class="grow break-words" data-pagefind-body>
		<div id="blog-hero" class="mb-12">
			<BlogMasthead :post="post" :reading-time="readingTime" />
		</div>
		<div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
			<BlogTOC v-if="tocHeadings.length" :headings="tocHeadings" />
			<div
				class="prose prose-sm prose-headings:font-semibold prose-headings:text-accent-2 prose-headings:before:absolute prose-headings:before:-ms-4 prose-headings:before:text-gray-600 prose-headings:hover:before:text-accent sm:prose-headings:before:content-['#'] sm:prose-th:before:content-none"
			>
				<ContentRenderer :value="post" />
			</div>
		</div>
		<BlogWebmentionsWebmentions :post-url="postUrl" />
	</article>
	<button
		:class="[
			'hover:border-link fixed end-4 bottom-8 z-90 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-transparent bg-zinc-200 text-3xl transition-all duration-300 sm:end-8 sm:h-12 sm:w-12 dark:bg-zinc-700',
			showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-28 opacity-0',
		]"
		@click="scrollToTop"
	>
		<span class="sr-only">Back to top</span>
		<svg
			aria-hidden="true"
			class="h-6 w-6"
			fill="none"
			focusable="false"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M4.5 15.75l7.5-7.5 7.5 7.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>
</template>
