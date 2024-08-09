export function formatDate(
	dateString: string,
	locale: string = "en-GB"
): string {
	if (!dateString) return "";

	const date = new Date(dateString);

	return new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		timeZoneName: "short",
	}).format(date);
}
