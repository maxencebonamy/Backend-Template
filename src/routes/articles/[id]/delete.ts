import prisma from "#/start/prisma"
import type { RouteHandler } from "fastify"

export const handler: RouteHandler = async (request, reply) => {
	const { id } = request.params as { id: string }

	await prisma.article.delete({ where: { id } })

	await reply.code(200).send({ message: "Article deleted" })
}

export const schema = {
	description: "Delete article by ID",
	tags: [ "articles" ],
	summary: "destroyArticle",
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
