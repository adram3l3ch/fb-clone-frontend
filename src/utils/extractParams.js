export default function extractParams(formData, ...keys) {
	const params = {};
	keys.forEach(key => (params[key] = formData[key]));
	return params;
}
