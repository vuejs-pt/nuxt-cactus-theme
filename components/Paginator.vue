<script setup lang="ts">
import type { PaginationLink } from "../types";

defineProps<{
	prevUrl?: PaginationLink;
	nextUrl?: PaginationLink;
}>();
</script>

<template>
	<nav v-if="prevUrl || nextUrl" class="mt-8 flex items-center gap-x-4">
		<NuxtLink v-if="prevUrl" class="hover:text-accent me-auto py-2" :to="prevUrl.url">
			<span v-if="prevUrl.srLabel" class="sr-only">{{ prevUrl.srLabel }}</span>
			{{ prevUrl.text || "Previous" }}
		</NuxtLink>
		<NuxtLink v-if="nextUrl" class="hover:text-accent ms-auto py-2" :to="nextUrl.url">
			<span v-if="nextUrl.srLabel" class="sr-only">{{ nextUrl.srLabel }}</span>
			{{ nextUrl.text || "Next" }}
		</NuxtLink>
	</nav>
</template>
