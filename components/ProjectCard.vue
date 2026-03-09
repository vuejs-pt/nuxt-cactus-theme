<script setup lang="ts">
import type { Project } from "../types";

defineProps<{ project: Project }>();
</script>

<template>
	<li>
		<a
			:href="project.url"
			class="cactus-link"
			rel="noopener noreferrer"
			target="_blank"
		>
			{{ project.name }}
		</a>
		<span>: {{ project.desc }}</span>
	</li>
</template>
