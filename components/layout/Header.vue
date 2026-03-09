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
const route = useRoute();
const menuOpen = ref(false);

function toggleMenu() {
	menuOpen.value = !menuOpen.value;
}
</script>

<template>
	<header
		:class="['group relative mb-28 flex items-center sm:ps-18', { 'menu-open': menuOpen }]"
		id="main-header"
	>
		<div class="flex sm:flex-col">
			<NuxtLink
				:aria-current="route.path === '/' ? 'page' : undefined"
				class="inline-flex items-center sm:relative sm:inline-block sm:grayscale sm:hover:filter-none"
				to="/"
			>
				<svg
					aria-hidden="true"
					class="me-3 h-10 w-6 sm:absolute sm:-start-18 sm:me-0 sm:h-20 sm:w-12"
					fill="none"
					focusable="false"
					viewBox="0 0 272 480"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Nuxt Cactus Logo</title>
					<path
						fill="#cdffb8"
						d="M181.334 93.333v-40L226.667 80v40zM136.001 53.333 90.667 26.667v426.666L136.001 480zM45.333 220 0 193.334v140L45.333 360z"
					/>
					<path
						fill="#d482ab"
						d="M90.667 26.667 136.001 0l45.333 26.667-45.333 26.666zM181.334 53.33l45.333-26.72L272 53.33 226.667 80zM136 240l-45.333-26.67v53.34zM0 193.33l45.333-26.72 45.334 26.72L45.333 220zM181.334 93.277 226.667 120l-45.333 26.67z"
					/>
					<path
						fill="#2abc89"
						d="m136 53.333 45.333-26.666v120L226.667 120V80L272 53.333V160l-90.667 53.333v240L136 480V306.667L45.334 360V220l45.333-26.667v73.334L136 240z"
					/>
				</svg>
				<span class="text-xl font-bold sm:text-2xl">{{ siteConfig.title }}</span>
			</NuxtLink>
			<nav
				aria-label="Main menu"
				:class="[
					'bg-global-bg absolute -inset-x-4 top-12 hidden flex-col divide-y px-2 py-4 sm:static sm:z-auto sm:-ms-4 sm:mt-1 sm:flex sm:flex-row sm:divide-x sm:divide-y-0 sm:bg-transparent sm:p-0',
					{ 'z-50 !flex': menuOpen },
				]"
				id="navigation-menu"
			>
				<NuxtLink
					v-for="link in menuLinks"
					:key="link.path"
					:aria-current="route.path === link.path ? 'page' : undefined"
					class="text-accent px-2 py-4 font-semibold sm:px-4 sm:py-0 sm:underline-offset-2 sm:hover:underline"
					:to="link.path"
				>
					{{ link.title }}
				</NuxtLink>
			</nav>
		</div>
		<Search />
		<ThemeToggle />
		<button
			:aria-expanded="menuOpen.toString()"
			aria-haspopup="menu"
			class="group relative ms-4 h-7 w-7 sm:invisible sm:hidden"
			id="toggle-navigation-menu"
			type="button"
			@click="toggleMenu"
		>
			<span class="sr-only">Open main menu</span>
			<svg
				aria-hidden="true"
				:class="[
					'absolute start-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all',
					{ 'scale-0 opacity-0': menuOpen },
				]"
				fill="none"
				focusable="false"
				stroke="currentColor"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M3.75 9h16.5m-16.5 6.75h16.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			<svg
				aria-hidden="true"
				:class="[
					'text-accent absolute start-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all',
					menuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
				]"
				fill="none"
				focusable="false"
				stroke="currentColor"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</header>
</template>
