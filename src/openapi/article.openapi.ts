import { categorySchema } from "#/openapi/category.openapi"

export const articleSchema = {
	type: "object",
	properties: {
		id: { type: "string", format: "uuid" },
		title: { type: "string" },
		content: { type: "string" },
		illustration: { type: "string" },
		authorId: { type: "string", format: "uuid" },
		createdAt: { type: "string", format: "date-time" },
		updatedAt: { type: "string", format: "date-time" }
	},
	required: [ "id", "title", "content", "createdAt", "updatedAt" ]
}

export const articleWithCategoriesSchema = {
	...articleSchema,
	properties: {
		...articleSchema.properties,
		categories: {
			type: "array",
			items: {
				type: "object",
				properties: {
					category: categorySchema
				},
				required: [ "category" ]
			}
		}
	},
	required: [ ...articleSchema.required, "categories" ]
}
