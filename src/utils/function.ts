export const repeat = (callback: () => void, times: number): void => {
	return Array.from({ length: times }).forEach(callback)
}

export const repeatAsync = async (callback: () => Promise<void>, times: number): Promise<void> => {
	await Promise.all(Array.from({ length: times }).map(callback))
}
