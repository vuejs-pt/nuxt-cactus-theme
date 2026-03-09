<script setup lang="ts">
import type { TocItem } from "~/utils/toc";

defineProps<{
	headings: TocItem[];
}>();
</script>

<template>
	<details open class="lg:sticky lg:top-12 lg:order-2 lg:-me-32 lg:basis-64">
		<summary class="title hover:marker:text-accent cursor-pointer text-lg">
			Table of Contents
		</summary>
		<nav class="ms-4 lg:w-full">
			<ol class="mt-4 list-none ps-0">
				<BlogTOCHeading v-for="heading in headings" :key="heading.id" :heading="heading" />
			</ol>
		</nav>
	</details>
</template>
