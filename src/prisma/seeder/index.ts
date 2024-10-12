/* eslint-disable no-console */

import { seedArticles } from "#/prisma/seeder/article.seeder"
import { seedCategories } from "#/prisma/seeder/category.seeder"
import { seedComments } from "#/prisma/seeder/comment.seeder"
import { seedUsers } from "#/prisma/seeder/user.seeder"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed(): Promise<void> {
	await prisma.comment.deleteMany()
	await prisma.articleCategory.deleteMany()
	await prisma.article.deleteMany()
	await prisma.category.deleteMany()
	await prisma.user.deleteMany()

	await seedUsers(prisma)
	await seedCategories(prisma)
	await seedArticles(prisma)
	await seedComments(prisma)
}

seed()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
