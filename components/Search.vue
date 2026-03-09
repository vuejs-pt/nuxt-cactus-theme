<script setup lang="ts">
const dialogRef = ref<HTMLDialogElement | null>(null);
const dialogFrameRef = ref<HTMLDivElement | null>(null);
const searchContainerRef = ref<HTMLDivElement | null>(null);
const isOpen = ref(false);
const pagefindLoaded = ref(false);
let pagefindUI: any = null;

async function initPagefind() {
	if (pagefindLoaded.value) return;
	try {
		const { PagefindUI } = await import("@pagefind/default-ui");
		pagefindUI = new PagefindUI({
			element: searchContainerRef.value,
			showSubResults: true,
			showImages: false,
		});
		pagefindLoaded.value = true;
	} catch {
		// Pagefind index not available (dev mode)
	}
}

function openModal() {
	dialogRef.value?.showModal();
	isOpen.value = true;
	nextTick(async () => {
		await initPagefind();
		const input = dialogRef.value?.querySelector<HTMLInputElement>(".pagefind-ui__search-input");
		input?.focus();
	});
}

function closeModal() {
	dialogRef.value?.close();
	isOpen.value = false;
}

function onWindowClick(event: MouseEvent) {
	const isLink = "href" in (event.target || {});
	if (
		isLink ||
		(document.body.contains(event.target as Node) &&
			!dialogFrameRef.value?.contains(event.target as Node))
	) {
		closeModal();
	}
}

function onKeydown(e: KeyboardEvent) {
	if ((e.metaKey || e.ctrlKey) && e.key === "k") {
		isOpen.value ? closeModal() : openModal();
		e.preventDefault();
	}
}

onMounted(() => {
	window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
	window.removeEventListener("keydown", onKeydown);
});

watch(isOpen, (open) => {
	if (open) {
		window.addEventListener("click", onWindowClick);
	} else {
		window.removeEventListener("click", onWindowClick);
	}
});
</script>

<template>
	<div class="ms-auto">
		<button
			class="hover:text-accent flex h-9 w-9 cursor-pointer items-center justify-center rounded-md"
			aria-keyshortcuts="Control+K Meta+K"
			@click.stop="openModal"
		>
			<svg
				aria-hidden="true"
				class="h-7 w-7"
				fill="none"
				height="16"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				width="16"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M0 0h24v24H0z" stroke="none" />
				<path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6" />
			</svg>
			<span class="sr-only">Open Search</span>
		</button>
		<dialog
			ref="dialogRef"
			aria-label="search"
			class="bg-global-bg h-full max-h-full w-full max-w-full border border-zinc-400 shadow-sm backdrop:backdrop-blur-sm open:flex sm:mx-auto sm:mt-16 sm:mb-auto sm:h-max sm:max-h-[calc(100%-8rem)] sm:min-h-[15rem] sm:w-5/6 sm:max-w-[48rem] sm:rounded-md"
		>
			<div ref="dialogFrameRef" class="dialog-frame flex grow flex-col gap-4 p-6 pt-12 sm:pt-6">
				<button
					class="ms-auto cursor-pointer rounded-md bg-zinc-200 p-2 font-semibold dark:bg-zinc-700"
					@click="closeModal"
				>
					Close
				</button>
				<div ref="searchContainerRef" class="search-container w-full" />
				<div v-if="!pagefindLoaded" class="mx-auto text-center">
					<p>
						Search is only available in production builds.<br />
						Try building and previewing the site to test it out locally.
					</p>
				</div>
			</div>
		</dialog>
	</div>
</template>

<style>
.pagefind-ui__search-input {
	background-color: var(--color-global-bg);
	color: var(--color-global-text);
	width: 100%;
	border-radius: 0.375rem;
	border: 1px solid #d4d4d8;
	padding: 0.5rem 1rem;
}

[data-theme="dark"] .pagefind-ui__search-input {
	border-color: #52525b;
}

.pagefind-ui__result-link {
	color: var(--color-link);
}

.pagefind-ui__result-link:hover {
	color: var(--color-accent);
}

.pagefind-ui__result-excerpt {
	color: var(--color-global-text);
	opacity: 0.8;
	font-size: 0.875rem;
}

.pagefind-ui__message {
	color: var(--color-global-text);
	opacity: 0.6;
	padding: 1rem 0;
	text-align: center;
}
</style>
