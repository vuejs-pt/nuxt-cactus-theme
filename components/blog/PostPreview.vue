<script setup lang="ts">
import type { Collections } from "#content";

const props = withDefaults(
	defineProps<{
		post: Collections["post"];
		as?: string;
		withDesc?: boolean;
	}>(),
	{
		as: "div",
		withDesc: false,
	},
);
</script>

<template>
	<FormattedDate
		class="min-w-30 font-semibold text-gray-600 dark:text-gray-400"
		:date="new Date(post.publishDate)"
	/>
	<component :is="as">
		<span v-if="post.draft" class="text-red-500">(Draft) </span>
		<NuxtLink class="cactus-link" :to="post.path">
			{{ post.title }}
		</NuxtLink>
	</component>
	<q v-if="withDesc" class="line-clamp-3 italic">{{ post.description }}</q>
</template>
