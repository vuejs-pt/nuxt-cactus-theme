<script setup lang="ts">
const props = defineProps<{
	repo?: string;
	user?: string;
}>();

const loading = ref(true);
const hasError = ref(false);

const avatarUrl = ref("");
const description = ref("");
const stars = ref("");
const forks = ref("");
const license = ref("");
const language = ref("");
const followers = ref("");
const repositories = ref("");
const region = ref("");

const repoName = computed(() => {
	const name = props.repo ?? props.user ?? "";
	let cleaned = name.endsWith("/") ? name.slice(0, -1) : name;
	cleaned = cleaned.startsWith("https://github.com/")
		? cleaned.replace("https://github.com/", "")
		: cleaned;
	return cleaned;
});

const isRepo = computed(() => repoName.value.includes("/"));
const realUrl = computed(() => `https://github.com/${repoName.value}`);

function formatNumber(n: number): string {
	return Intl.NumberFormat(undefined, {
		notation: "compact",
		maximumFractionDigits: 1,
	})
		.format(n)
		.replaceAll("\u202f", "");
}

if (import.meta.client) {
	onMounted(async () => {
		if (!repoName.value) return;

		const endpoint = isRepo.value
			? `https://api.github.com/repos/${repoName.value}`
			: `https://api.github.com/users/${repoName.value}`;

		try {
			const response = await fetch(endpoint, {
				referrerPolicy: "no-referrer",
			});
			const data = await response.json();

			if (isRepo.value) {
				avatarUrl.value = data.owner?.avatar_url ?? "";
				description.value = data.description
					? data.description.replace(/:[a-zA-Z0-9_]+:/g, "")
					: "";
				language.value = data.language ?? "";
				forks.value = formatNumber(data.forks ?? 0);
				stars.value = formatNumber(data.stargazers_count ?? 0);
				license.value = data.license?.spdx_id ?? "";
			} else {
				avatarUrl.value = data.avatar_url ?? "";
				followers.value = formatNumber(data.followers ?? 0);
				repositories.value = formatNumber(data.public_repos ?? 0);
				region.value = data.location ?? "";
			}

			loading.value = false;
		} catch (e) {
			hasError.value = true;
			loading.value = false;
			console.warn(
				`[GITHUB-CARD] Error loading card for ${repoName.value}.`,
				e,
			);
		}
	});
}
</script>

<template>
	<div
		class="github-card"
		:class="{
			'gh-simple': !isRepo,
			'gh-loading': loading,
			'gh-error': hasError,
		}"
	>
		<div class="gh-title title">
			<span
				class="gh-avatar"
				:style="
					avatarUrl
						? { backgroundImage: 'url(' + avatarUrl + ')' }
						: undefined
				"
			></span>
			<a class="gh-text not-prose cactus-link" :href="realUrl">{{
				repoName
			}}</a>
			<span class="gh-icon"></span>
		</div>
		<div
			v-if="isRepo && (description || loading)"
			class="gh-description"
		>
			{{
				loading
					? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
					: description
			}}
		</div>
		<div class="gh-chips">
			<template v-if="isRepo">
				<span class="gh-stars">{{ loading ? "00K" : stars }}</span>
				<span class="gh-forks">{{ loading ? "00K" : forks }}</span>
				<span v-if="license || loading" class="gh-license">{{
					loading ? "MIT" : license
				}}</span>
				<span class="gh-language">{{ language }}</span>
			</template>
			<template v-else>
				<span class="gh-followers">{{
					loading ? "00K" : followers
				}}</span>
				<span class="gh-repositories">{{
					loading ? "00K" : repositories
				}}</span>
				<span class="gh-region">{{ region }}</span>
			</template>
		</div>
	</div>
</template>
