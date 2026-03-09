export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
	dateConfig?: { locale?: string | string[]; options?: Intl.DateTimeFormatOptions },
): string {
	if (date === undefined) {
		return "Invalid Date";
	}

	const locale = dateConfig?.locale ?? "en-GB";
	const defaultOptions: Intl.DateTimeFormatOptions = dateConfig?.options ?? {
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	return new Intl.DateTimeFormat(locale, {
		...defaultOptions,
		...options,
	}).format(date);
}

export function collectionDateSort(
	a: { data: { publishDate: Date } },
	b: { data: { publishDate: Date } },
) {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}
