import { repeatAsync } from "#/utils/function"
import { faker } from "@faker-js/faker"
import type { PrismaClient } from "@prisma/client"

export const seedComments = async (prisma: PrismaClient): Promise<void> => {
	const articles = await prisma.article.findMany()

	await repeatAsync(async () => {
		const article = faker.helpers.arrayElement(articles)
		const users = await prisma.user.findMany()

		await prisma.comment.create({
			data: {
				content: faker.lorem.paragraph(),
				articleId: article.id,
				authorId: faker.helpers.arrayElement(users).id
			}
		})
	}, 3000)
}
