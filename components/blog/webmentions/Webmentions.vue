<script setup lang="ts">
import type { WebmentionsChildren } from "../../../types";

const props = defineProps<{
	postUrl: string;
}>();

const config = useRuntimeConfig();
const enabled = computed(() => !!config.public.webmentionUrl);

const { data: mentionsData } = await useAsyncData(
	`webmentions-${props.postUrl}`,
	() => $fetch("/api/webmentions", { params: { url: props.postUrl } }),
	{ default: () => ({ children: [] as WebmentionsChildren[] }) },
);

const mentions = computed(() => mentionsData.value?.children ?? []);
</script>

<template>
	<aside
		v-if="enabled && mentions.length"
		class="mt-16 border-t border-dashed border-gray-500 pt-8"
	>
		<h2 class="title mb-8 text-xl">Webmentions for this post</h2>
		<WebmentionLikes :mentions="mentions" />
		<div v-if="mentions.length" class="mt-8">
			<WebmentionComments :mentions="mentions" />
		</div>
		<p class="mt-8 text-sm text-gray-600 dark:text-gray-400">
			Responses powered by
			<a
				class="cactus-link"
				href="https://webmention.io"
				rel="noreferrer"
				target="_blank"
			>
				Webmentions
			</a>
		</p>
	</aside>
</template>
