<script setup lang="ts">
useSEO({
	title: "Projects",
	description: "A list of projects",
});

const { projects } = useAppConfig();
</script>

<template>
	<section>
		<h1 class="title mb-6">Projects</h1>
		<ul v-if="projects.length > 0" class="space-y-2" role="list">
			<ProjectCard v-for="project in projects" :key="project.name" :project="project" />
		</ul>
		<p v-else>No projects yet.</p>
	</section>
</template>
