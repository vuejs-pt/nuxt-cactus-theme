<script setup lang="ts">
import type { Collections } from "#content";

const props = defineProps<{
	post: Collections["post"];
	readingTime?: string;
}>();

import { getNormalizedTags } from "../../data/post";

const dateTimeOptions: Intl.DateTimeFormatOptions = {
	month: "long",
};

const normalizedTags = computed(() => getNormalizedTags(props.post));
</script>

<template>
	<div v-if="post.coverImage" class="mb-6 aspect-video">
		<img
			:alt="post.coverImage.alt"
			class="h-full w-full object-cover"
			:height="420"
			loading="eager"
			:src="post.coverImage.src"
			:width="748"
		/>
	</div>
	<span v-if="post.draft" class="text-base text-red-500">(Draft)</span>
	<h1 class="title">{{ post.title }}</h1>
	<div class="flex flex-wrap items-center gap-x-3 gap-y-2">
		<p class="font-semibold">
			<FormattedDate :date="new Date(post.publishDate)" :date-time-options="dateTimeOptions" />
			<template v-if="readingTime"> / {{ readingTime }}</template>
		</p>
		<span v-if="post.updatedDate" class="bg-quote/5 text-quote rounded-lg px-2 py-1">
			Updated:
			<FormattedDate
				class="ms-1"
				:date="new Date(post.updatedDate)"
				:date-time-options="dateTimeOptions"
			/>
		</span>
	</div>
	<div v-if="normalizedTags.length" class="mt-2">
		<svg
			aria-hidden="true"
			class="me-2 inline-block h-6 w-6"
			fill="none"
			focusable="false"
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
		<span v-for="(tag, i) in normalizedTags" :key="tag" class="contents">
			<NuxtLink
				class="cactus-link inline-block before:content-['#']"
				:to="`/tags/${tag}/`"
			>
				<span class="sr-only">View more blogs with the tag&nbsp;</span>{{ tag }}
			</NuxtLink>
			<span v-if="i < normalizedTags.length - 1">, </span>
		</span>
	</div>
</template>
