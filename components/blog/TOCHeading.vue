<script setup lang="ts">
import type { TocItem } from "~/utils/toc";

defineProps<{
	heading: TocItem;
}>();
</script>

<template>
	<li :class="heading.depth > 2 ? 'ms-2' : ''">
		<a
			:class="[
				'line-clamp-2 hover:text-accent',
				heading.depth <= 2 ? 'mt-3' : 'mt-2 text-xs',
			]"
			:href="`#${heading.id}`"
		>
			<span aria-hidden="true" class="me-0.5">#</span>{{ heading.text }}
		</a>
		<ol v-if="heading.children?.length">
			<BlogTOCHeading v-for="child in heading.children" :key="child.id" :heading="child" />
		</ol>
	</li>
</template>
