<script setup lang="ts">
const props = defineProps<{
	code?: string;
	language?: string | null;
	filename?: string | null;
	highlights?: number[];
	meta?: string | null;
	class?: string | null;
}>();

const title = computed(() => {
	if (!props.meta) return null;
	const match = props.meta.match(/title="([^"]*)"/);
	return match ? match[1] : null;
});

function parseLineRanges(str: string): number[] {
	const lines: number[] = [];
	for (const part of str.split(",")) {
		const range = part.trim().match(/^(\d+)(?:-(\d+))?$/);
		if (range) {
			const start = parseInt(range[1]);
			const end = range[2] ? parseInt(range[2]) : start;
			for (let i = start; i <= end; i++) lines.push(i);
		}
	}
	return lines;
}

function parseMarkers(meta: string | null | undefined, highlights: number[] | undefined) {
	const del: number[] = [];
	const ins: number[] = [];
	const mark: number[] = [];
	if (!meta) return { del, ins, mark };

	const delMatch = meta.match(/del=\{([^}]+)\}/);
	if (delMatch) {
		del.push(...parseLineRanges(delMatch[1]));
	} else if (/del=\s/.test(meta) || meta.endsWith("del=")) {
		del.push(...(highlights || []));
	}

	const insMatch = meta.match(/ins=\{([^}]+)\}/);
	if (insMatch) ins.push(...parseLineRanges(insMatch[1]));

	const metaClean = meta
		.replace(/del=\{[^}]+\}/g, "")
		.replace(/del=/g, "")
		.replace(/ins=\{[^}]+\}/g, "")
		.replace(/title="[^"]*"/g, "");
	const markMatch = metaClean.match(/\{([^}]+)\}/);
	if (markMatch) mark.push(...parseLineRanges(markMatch[1]));

	return { del, ins, mark };
}

const markers = computed(() => parseMarkers(props.meta, props.highlights));
const hasMarkers = computed(() => {
	const m = markers.value;
	return m.del.length > 0 || m.ins.length > 0 || m.mark.length > 0;
});

const preRef = ref<HTMLElement | null>(null);

function getMarkerType(num: number, m: { del: number[]; ins: number[]; mark: number[] }): string | null {
	if (m.del.includes(num)) return "del";
	if (m.ins.includes(num)) return "ins";
	if (m.mark.includes(num)) return "mark";
	return null;
}

onMounted(() => {
	if (!hasMarkers.value || !preRef.value) return;
	const m = markers.value;
	const codeEl = preRef.value.querySelector("code");
	if (!codeEl) return;

	const lineSpans = Array.from(codeEl.querySelectorAll<HTMLElement>(":scope > .line[line]"));
	for (const span of lineSpans) {
		const num = parseInt(span.getAttribute("line") || "0");
		const markerType = getMarkerType(num, m);

		const wrapper = document.createElement("div");
		wrapper.className = "ec-line" + (markerType ? ` ${markerType}` : "");

		const codeDiv = document.createElement("div");
		codeDiv.className = "code";

		while (span.firstChild) {
			codeDiv.appendChild(span.firstChild);
		}

		const lastText = codeDiv.lastChild;
		if (lastText && lastText.nodeType === Node.TEXT_NODE && lastText.textContent?.endsWith("\n")) {
			lastText.textContent = lastText.textContent.slice(0, -1);
		}

		wrapper.appendChild(codeDiv);
		span.replaceWith(wrapper);
	}
});

const copied = ref(false);

function copyCode() {
	if (!props.code) return;
	navigator.clipboard.writeText(props.code).then(() => {
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	});
}
</script>

<template>
	<div class="code-block" :class="{ 'has-title': title, 'has-markers': hasMarkers }">
		<div v-if="title" class="code-block-header">
			<span class="code-block-title">{{ title }}</span>
		</div>
		<div class="code-block-body">
			<pre ref="preRef" :class="$props.class"><slot /></pre>
			<button
				class="copy-button"
				:title="copied ? 'Copied!' : 'Copy to clipboard'"
				@click="copyCode"
			>
				<svg
					v-if="!copied"
					aria-hidden="true"
					class="copy-icon"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
				</svg>
				<svg
					v-else
					aria-hidden="true"
					class="copy-icon"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polyline points="20 6 9 17 4 12" />
				</svg>
			</button>
		</div>
	</div>
</template>
