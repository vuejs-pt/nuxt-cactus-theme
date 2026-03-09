<script setup lang="ts">
const route = useRoute();

const { data: note } = await useAsyncData(`note-${route.path}`, () =>
	queryCollection("note").path(route.path).first(),
);

if (!note.value) {
	throw createError({ statusCode: 404, message: "Note not found" });
}

useSEO({
	title: note.value.title,
	description:
		note.value.description ||
		`Read about my note posted on: ${new Date(note.value.publishDate).toLocaleDateString()}`,
});
</script>

<template>
	<section v-if="note">
		<NoteCard :note="note" as="h1" />
	</section>
</template>
