function extractTextFromNode(node: any): string {
	if (!node) return "";
	if (typeof node === "string") return node;
	if (Array.isArray(node)) return node.map(extractTextFromNode).join(" ");
	if (node.value && typeof node.value === "string") return node.value;
	if (node.children) return extractTextFromNode(node.children);
	return "";
}

export function getReadingTime(body: any): string {
	if (!body) return "";

	let text: string;
	if (body.value) {
		text = extractTextFromNode(body.value);
	} else {
		text = extractTextFromNode(body);
	}

	if (!text || text.trim().length < 10) {
		text = JSON.stringify(body);
		text = text.replace(/"[a-zA-Z_]+":/g, " ");
		text = text.replace(/[[\]{}",\\:0-9]+/g, " ");
	}

	const words = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
	const minutes = Math.max(1, Math.ceil(words / 200));
	return `${minutes} min read`;
}
