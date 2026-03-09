export interface TocItem {
	id: string;
	depth: number;
	text: string;
	children?: TocItem[];
}

export function getTocFromBody(body: any): TocItem[] {
	return body?.toc?.links ?? [];
}
