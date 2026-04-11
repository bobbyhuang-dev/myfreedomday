const JSON_LD_ESCAPE_MAP: Record<string, string> = {
	'<': '\\u003C',
	'>': '\\u003E',
	'&': '\\u0026',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029',
};

export const serializeJsonLd = (value: unknown) =>
	JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => JSON_LD_ESCAPE_MAP[character]);
