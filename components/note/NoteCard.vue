<script setup lang="ts">
import type { Collections } from "#content";

withDefaults(
	defineProps<{
		note: Collections["note"];
		as?: string;
		isPreview?: boolean;
	}>(),
	{
		as: "div",
		isPreview: false,
	},
);
</script>

<template>
	<article
		:class="[isPreview && 'bg-global-text/5 inline-grid rounded-md px-4 py-3']"
		:data-pagefind-body="isPreview ? undefined : true"
	>
		<component :is="as" :class="['title', { 'text-base': isPreview }]">
			<NuxtLink v-if="isPreview" class="cactus-link" :to="note.path">
				{{ note.title }}
			</NuxtLink>
			<template v-else>{{ note.title }}</template>
		</component>
		<FormattedDate
			:date="new Date(note.publishDate)"
			:date-time-options="{
				hour: '2-digit',
				minute: '2-digit',
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
			}"
		/>
		<div
			:class="[
				'prose prose-sm prose-cactus mt-4 max-w-none [&>p:last-of-type]:mb-0',
				{ 'line-clamp-6': isPreview },
			]"
		>
			<ContentRenderer :value="note" />
		</div>
	</article>
</template>
