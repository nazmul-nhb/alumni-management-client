export function createHeroOptions<T extends string>(input: Readonly<T[]>) {
	return input?.map((option) => {
		return {
			key: option,
			label: option,
		};
	});
}
