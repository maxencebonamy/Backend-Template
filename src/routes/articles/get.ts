import { paginationMetaSchema } from "#/openapi"
import { articleWithCategoriesSchema } from "#/openapi/article.openapi"
import prisma from "#/start/prisma"
import { paginate } from "#/utils/prisma"
import type { Prisma } from "@prisma/client"
import type { RouteHandler } from "fastify"

export const handler: RouteHandler = async (request, reply) => {
	type Query = { page: number, limit: number, search: string, authorFilter?: string, categoryFilter?: string }
	const { page, limit, search, authorFilter, categoryFilter } = request.query as Query

	const where = {
		OR: [
			{ content: { contains: search, mode: "insensitive" } },
			{ title: { contains: search, mode: "insensitive" } }
		],
		authorId: authorFilter,
		categories: { some: { categoryId: categoryFilter } }
	} satisfies Prisma.ArticleWhereInput

	const articles = await prisma.article.findMany({
		where,
		include: {
			categories: {
				select: { category: true }
			}
		},
		skip: (page - 1) * limit,
		take: limit
	})

	const total = await prisma.article.count({ where })
	const meta = paginate(page, limit, total)

	await reply.code(200).send({ meta, data: articles })
}

export const schema = {
	description: "Get all articles",
	tags: [ "articles" ],
	summary: "indexArticles",
	querystring: {
		type: "object",
		properties: {
			page: { type: "integer", minimum: 1, default: 1 },
			limit: { type: "integer", minimum: 1, default: 10 },
			search: { type: "string", default: "" },
			authorFilter: { type: "string", format: "uuid" },
			categoryFilter: { type: "string", format: "uuid" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				meta: paginationMetaSchema,
				data: {
					type: "array",
					items: articleWithCategoriesSchema
				}
			}
		},
		400: {
			description: "Invalid query params",
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
