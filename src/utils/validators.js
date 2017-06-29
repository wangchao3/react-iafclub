export function validateEmpty(value) {
	return !!value.trim().length;
}
export function validateMobile(mobile) {
	return /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(mobile);
}
