<script setup lang="ts">
import { sortByDate } from "../../data/post";

useSEO({
	title: "Notes",
	description: "Read my collection of notes",
});

const { data: allNotes } = await useAsyncData("all-notes", () =>
	queryCollection("note").all(),
);

const sortedNotes = computed(() => sortByDate(allNotes.value || []));
</script>

<template>
	<section>
		<h1 class="title mb-12 flex items-center gap-3">
			Notes
			<a class="text-accent" href="/notes/rss.xml" target="_blank">
				<span class="sr-only">RSS feed</span>
				<svg
					aria-hidden="true"
					class="h-6 w-6"
					fill="currentColor"
					focusable="false"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"
					/>
				</svg>
			</a>
		</h1>
		<ul class="mt-6 space-y-8 text-start">
			<li v-for="note in sortedNotes" :key="note.path">
				<NoteCard :note="note" as="h2" is-preview />
			</li>
		</ul>
	</section>
</template>
