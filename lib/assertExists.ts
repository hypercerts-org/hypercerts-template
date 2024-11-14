export const assertExists = <T>(value: T | null | undefined): T => {
	if (value === null || value === undefined) {
		throw new Error("Value does not exist");
	}
	return value;
};
