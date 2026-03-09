<script setup lang="ts">
import type { WebmentionsChildren } from "../../../types";

const props = defineProps<{
	mentions: WebmentionsChildren[];
}>();

const validCommentTypes = ["mention-of", "in-reply-to"];

const comments = computed(() =>
	props.mentions.filter(
		(m) => validCommentTypes.includes(m["wm-property"]) && m.content?.text,
	),
);
</script>

<template>
	<div v-if="comments.length">
		<p class="mb-6">
			<span class="text-accent-2 font-semibold">{{ comments.length }}</span>
			Mention{{ comments.length > 1 ? "s" : "" }}
		</p>
		<ol class="space-y-8" role="list">
			<li
				v-for="mention in comments"
				:key="mention['wm-id']"
				class="flex gap-4"
			>
				<div
					v-if="mention.author?.photo && mention.author.photo !== ''"
					class="shrink-0"
				>
					<a
						v-if="mention.author.url && mention.author.url !== ''"
						:href="mention.author.url"
						rel="noreferrer"
						target="_blank"
					>
						<img
							:alt="mention.author.name"
							class="h-10 w-10 rounded-full"
							height="40"
							loading="lazy"
							:src="mention.author.photo"
							width="40"
						/>
					</a>
					<img
						v-else
						:alt="mention.author.name"
						class="h-10 w-10 rounded-full"
						height="40"
						loading="lazy"
						:src="mention.author.photo"
						width="40"
					/>
				</div>
				<div class="min-w-0">
					<div class="mb-1 flex items-center gap-2">
						<p v-if="mention.author?.name" class="font-semibold">
							{{ mention.author.name }}
						</p>
						<a
							class="hover:text-link inline-block"
							:href="mention.url"
							rel="noreferrer"
							target="_blank"
							:title="`Visit the source of this webmention`"
						>
							<svg
								aria-hidden="true"
								class="h-4 w-4"
								fill="none"
								focusable="false"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<polyline
									points="15 3 21 3 21 9"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<line
									stroke-linecap="round"
									stroke-linejoin="round"
									x1="10"
									x2="21"
									y1="14"
									y2="3"
								/>
							</svg>
							<span class="sr-only">Visit the source of this webmention</span>
						</a>
					</div>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						{{ mention.content?.text }}
					</p>
				</div>
			</li>
		</ol>
	</div>
</template>
