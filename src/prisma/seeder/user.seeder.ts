import { repeatAsync } from "#/utils/function"
import { faker } from "@faker-js/faker"
import type { PrismaClient } from "@prisma/client"

export const seedUsers = async (prisma: PrismaClient): Promise<void> => {
	await repeatAsync(async () => {
		await prisma.user.create({
			data: {
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				username: faker.internet.userName(),
				password: faker.internet.password(),
				picture: faker.image.avatar()
			}
		})
	}, 50)
}
