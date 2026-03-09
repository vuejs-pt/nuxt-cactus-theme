<script setup lang="ts">
const { siteConfig } = useAppConfig();

useHead({
	htmlAttrs: {
		lang: siteConfig.lang,
		class: "scroll-smooth",
	},
});
</script>

<template>
	<Body
		class="bg-global-bg text-global-text mx-auto flex min-h-screen max-w-3xl flex-col px-4 pt-16 font-mono text-sm font-normal antialiased sm:px-8"
	>
		<SkipLink />
		<LayoutHeader />
		<main id="main">
			<slot />
		</main>
		<LayoutFooter />
	</Body>
</template>
