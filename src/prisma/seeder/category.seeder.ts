import type { PrismaClient } from "@prisma/client"

export const seedCategories = async (prisma: PrismaClient): Promise<void> => {
	const categories = [
		{ name: "Nature", color: "#00FF00" },
		{ name: "Technology", color: "#0000FF" },
		{ name: "Science", color: "#FFFF00" },
		{ name: "Art", color: "#FF00FF" },
		{ name: "Music", color: "#00FFFF" },
		{ name: "Food", color: "#FFA500" },
		{ name: "Travel", color: "#800080" },
		{ name: "Fashion", color: "#FFC0CB" },
		{ name: "Health", color: "#FF0000" },
		{ name: "Fitness", color: "#008000" }
	]

	await Promise.all(categories.map(async data => {
		await prisma.category.create({
			data
		})
	}))
}
