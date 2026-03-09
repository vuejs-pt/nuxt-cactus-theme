<script setup lang="ts">
import { sortByDate, filterDrafts } from "../data/post";
const { siteConfig, projects } = useAppConfig();

useSEO({
	title: "Home",
	description: siteConfig.description,
});

const MAX_POSTS = 10;
const MAX_PINNED_POSTS = 3;
const MAX_NOTES = 5;

const { data: allPosts } = await useAsyncData("home-posts", () =>
	queryCollection("post").all(),
);

const { data: allNotes } = await useAsyncData("home-notes", () =>
	queryCollection("note").all(),
);

const sortedPosts = computed(() => sortByDate(filterDrafts(allPosts.value || [])));
const latestPosts = computed(() => sortedPosts.value.slice(0, MAX_POSTS));
const pinnedPosts = computed(() =>
	sortedPosts.value.filter((p) => p.pinned).slice(0, MAX_PINNED_POSTS),
);
const latestNotes = computed(() => sortByDate(allNotes.value || []).slice(0, MAX_NOTES));
</script>

<template>
	<section>
		<h1 class="title mb-12">Hello World!</h1>
		<p class="mb-4">
			Hi, I'm a theme for Nuxt, a simple starter that you can use to create your website or
			blog. If you want to know more about how you can customise me, add more posts, and make it
			your own, click on the GitHub icon link below and it will take you to my repo.
		</p>
		<SocialList />
	</section>
	<section v-if="pinnedPosts.length > 0" class="mt-16">
		<h2 class="title mb-6 text-xl">Pinned Posts</h2>
		<ul class="space-y-4" role="list">
			<li
				v-for="p in pinnedPosts"
				:key="p.path"
				class="grid gap-1 sm:grid-cols-[auto_1fr]"
			>
				<BlogPostPreview :post="p" />
			</li>
		</ul>
	</section>
	<section class="mt-16">
		<h2 class="title text-accent mb-6 text-xl">
			<NuxtLink to="/posts/">Posts</NuxtLink>
		</h2>
		<ul class="space-y-4" role="list">
			<li
				v-for="p in latestPosts"
				:key="p.path"
				class="grid gap-1 sm:grid-cols-[auto_1fr]"
			>
				<BlogPostPreview :post="p" />
			</li>
		</ul>
	</section>
	<section v-if="projects.length > 0" class="mt-16">
		<h2 class="title text-accent mb-6 text-xl">
			<NuxtLink to="/projects/">Projects</NuxtLink>
		</h2>
		<ul class="space-y-2" role="list">
			<ProjectCard v-for="project in projects" :key="project.name" :project="project" />
		</ul>
	</section>
	<section v-if="latestNotes.length > 0" class="mt-16">
		<h2 class="title text-accent mb-6 text-xl">
			<NuxtLink to="/notes/">Notes</NuxtLink>
		</h2>
		<ul class="space-y-6" role="list">
			<li v-for="note in latestNotes" :key="note.path">
				<NoteCard :note="note" as="h3" is-preview />
			</li>
		</ul>
	</section>
</template>
