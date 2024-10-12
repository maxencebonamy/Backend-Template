import "dotenv/config"
import { z } from "zod"

export const envDTO = z.object({
	DATABASE_URL: z.string().url(),
	PORT: z.coerce.number()
})

const parser = envDTO.safeParse(process.env)
if (!parser.success) throw Error("Missing environment variable", { cause: parser.error.message })

export const env = parser.data

export const isDevEnvironment = process.argv.includes("dev")
export const isProdEnvironment = !process.argv.includes("dev")
