export const paginationMetaSchema = {
	type: "object",
	properties: {
		page: { type: "integer" },
		perPage: { type: "integer" },
		totalPages: { type: "integer" },
		totalItems: { type: "integer" },
		previousPage: { type: [ "integer", "null" ] },
		nextPage: { type: [ "integer", "null" ] }
	},
	required: [ "page", "perPage", "totalPages", "totalItems", "previousPage", "nextPage" ]
}
