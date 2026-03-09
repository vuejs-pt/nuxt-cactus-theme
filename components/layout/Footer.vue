<script setup lang="ts">
const { siteConfig, menuLinks: rawMenuLinks } = useAppConfig();
const menuLinks = computed(() => {
	const seen = new Set<string>();
	return rawMenuLinks.filter((link) => {
		if (seen.has(link.path)) return false;
		seen.add(link.path);
		return true;
	});
});
const year = new Date().getFullYear();
</script>

<template>
	<footer
		class="mt-auto flex w-full flex-col items-center justify-center gap-y-2 pt-20 pb-4 text-center align-top font-semibold text-gray-600 sm:flex-row sm:justify-between sm:text-xs dark:text-gray-400"
	>
		<div class="me-0 sm:me-4">
			&copy; {{ siteConfig.author }}
			{{ year }}.<span class="inline-block">&nbsp;🚀&nbsp;{{ siteConfig.title }}</span>
		</div>
		<nav
			aria-labelledby="footer_links"
			class="flex gap-x-2 sm:gap-x-0 sm:divide-x sm:divide-gray-500"
		>
			<p id="footer_links" class="sr-only">More on this site</p>
			<NuxtLink
				v-for="link in menuLinks"
				:key="link.path"
				class="hover:text-global-text px-4 py-2 hover:underline sm:py-0"
				:to="link.path"
			>
				{{ link.title }}
			</NuxtLink>
		</nav>
	</footer>
</template>
