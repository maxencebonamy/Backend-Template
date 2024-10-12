import { articleWithCategoriesSchema } from "#/openapi/article.openapi"
import prisma from "#/start/prisma"
import type { RouteHandler } from "fastify"

export const handler: RouteHandler = async (request, reply) => {
	const { id } = request.params as { id: string }

	const article = await prisma.article.findUnique({
		where: { id },
		include: {
			categories: {
				select: { category: true }
			}
		}
	})
	if (!article) return await reply.code(404).send({ message: "Article not found" })

	await reply.code(200).send(article)
}

export const schema = {
	description: "Get article by ID",
	tags: [ "articles" ],
	summary: "showArticle",
	params: {
		type: "object",
		properties: {
			id: {
				type: "string",
				format: "uuid",
				description: "article id"
			}
		}
	},
	response: {
		200: {
			description: "Successful response",
			...articleWithCategoriesSchema
		},
		400: {
			description: "Invalid ID supplied",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		404: {
			description: "Article not found",
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
