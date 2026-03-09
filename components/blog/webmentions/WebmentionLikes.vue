<script setup lang="ts">
import type { WebmentionsChildren } from "../../../types";

const props = defineProps<{
	mentions: WebmentionsChildren[];
}>();

const MAX_LIKES = 10;

const likes = computed(() =>
	props.mentions.filter((m) => m["wm-property"] === "like-of"),
);

const likesToShow = computed(() =>
	likes.value
		.filter((like) => like.author?.photo && like.author.photo !== "")
		.slice(0, MAX_LIKES),
);
</script>

<template>
	<div v-if="likes.length">
		<p class="mb-4">
			<span class="text-accent-2 font-semibold">{{ likes.length }}</span>
			{{ likes.length > 1 ? " People" : " Person" }} liked this
		</p>
		<ul v-if="likesToShow.length" class="flex flex-wrap gap-2" role="list">
			<li v-for="like in likesToShow" :key="like['wm-id']">
				<a
					v-if="like.author?.url"
					class="inline-block"
					:href="like.author.url"
					rel="noreferrer"
					target="_blank"
				>
					<img
						:alt="like.author.name"
						class="h-10 w-10 rounded-full"
						height="40"
						loading="lazy"
						:src="like.author.photo"
						width="40"
					/>
					<span class="sr-only">{{ like.author.name }}</span>
				</a>
			</li>
		</ul>
	</div>
</template>
