import { repeatAsync } from "#/utils/function"
import { faker } from "@faker-js/faker"
import type { PrismaClient } from "@prisma/client"

export const seedArticles = async (prisma: PrismaClient): Promise<void> => {
	const users = await prisma.user.findMany()

	await repeatAsync(async () => {
		await prisma.article.create({
			data: {
				title: faker.lorem.sentence(),
				content: faker.lorem.paragraphs(),
				illustration: faker.image.urlLoremFlickr({ width: 1920, height: 1080 }),
				authorId: faker.helpers.arrayElement(users).id
			}
		})
	}, 1000)

	const categories = await prisma.category.findMany()
	const articles = await prisma.article.findMany()

	await Promise.all(articles.map(async article => {
		const nbCategories = faker.number.int({ min: 1, max: 3 })
		const articleCategories = faker.helpers.shuffle(categories).slice(0, nbCategories)

		await Promise.all(articleCategories.map(async category => {
			await prisma.articleCategory.create({
				data: {
					articleId: article.id,
					categoryId: category.id
				}
			})
		}))
	}))
}
