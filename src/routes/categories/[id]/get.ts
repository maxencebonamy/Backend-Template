import { categorySchema } from "#/openapi"
import prisma from "#/start/prisma"
import type { RouteHandler } from "fastify"

export const handler: RouteHandler = async (request, reply) => {
	const { id } = request.params as { id: string }

	const category = await prisma.category.findUnique({ where: { id } })
	if (!category) return await reply.code(404).send({ message: "Category not found" })

	await reply.code(200).send(category)
}

export const schema = {
	description: "Get category by ID",
	tags: [ "categories" ],
	summary: "showCategory",
	params: {
		type: "object",
		properties: {
			id: {
				type: "string",
				format: "uuid",
				description: "category id"
			}
		},
		required: [ "id" ]
	},
	response: {
		200: {
			description: "Successful response",
			...categorySchema
		},
		400: {
			description: "Invalid ID supplied",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		404: {
			description: "Category not found",
			type: "object",
			properties: {
				message: { type: "string" }
			}
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
