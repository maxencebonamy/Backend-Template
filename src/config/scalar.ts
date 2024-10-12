import type { FastifyApiReferenceOptions } from "@scalar/fastify-api-reference"
import type { FastifyRegisterOptions } from "fastify"

const scalarConfig = {
	routePrefix: "/scalar"
} satisfies FastifyRegisterOptions<FastifyApiReferenceOptions>

export default scalarConfig
