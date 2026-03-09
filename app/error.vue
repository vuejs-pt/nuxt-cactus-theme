<script setup lang="ts">
const { siteConfig } = useAppConfig();

const props = defineProps<{
	error: {
		statusCode: number;
		message: string;
	};
}>();

useHead({
	title: `${props.error.statusCode === 404 ? "Oops! You found a missing page!" : "Error"} | ${siteConfig.title}`,
});

function handleClear() {
	clearError({ redirect: "/" });
}
</script>

<template>
	<Body
		class="bg-global-bg text-global-text mx-auto flex min-h-screen max-w-3xl flex-col px-4 pt-16 font-mono text-sm font-normal antialiased sm:px-8"
	>
		<main id="main" class="grow">
			<h1 class="title mb-12">
				{{ error.statusCode }} | Oops something went wrong
			</h1>
			<p class="mb-8">Please use the navigation to find your way back</p>
			<button class="cactus-link" @click="handleClear">Go home</button>
		</main>
	</Body>
</template>
