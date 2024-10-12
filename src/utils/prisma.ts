export type PaginationMeta = {
	page: number
	perPage: number
	totalPages: number
	totalItems: number
	previousPage: number | null
	nextPage: number | null
}

export const paginate = (page: number, perPage: number, totalItems: number): PaginationMeta => {
	const totalPages = Math.ceil(totalItems / perPage)
	const previousPage = page > 1 ? page - 1 : null
	const nextPage = page < totalPages ? page + 1 : null

	return {
		page,
		perPage,
		totalPages,
		totalItems,
		previousPage,
		nextPage
	}
}
