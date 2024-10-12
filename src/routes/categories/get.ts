import { categorySchema } from "#/openapi"
import prisma from "#/start/prisma"
import type { RouteHandler } from "fastify"

export const handler: RouteHandler = async (_request, reply) => {
	const categories = await prisma.category.findMany()

	await reply.code(200).send(categories)
}

export const schema = {
	description: "Get all categories",
	tags: [ "categories" ],
	summary: "indexCategories",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: categorySchema
		},
		500: {
			description: "Internal server error",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
}
