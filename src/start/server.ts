/* eslint-disable no-console */

import loggerConfig from "#/config/logger"
import scalarConfig from "#/config/scalar"
import swaggerConfig from "#/config/swagger"
import { loadAllRoutes } from "#/start/autoloader"
import { env } from "#/start/env"
import swagger from "@fastify/swagger"
import scalar from "@scalar/fastify-api-reference"
import Fastify from "fastify"

const server = Fastify({ logger: loggerConfig })
server.log.info("------ Server starting ------")

void Promise.all([
	server.register(swagger, swaggerConfig),
	server.register(scalar, scalarConfig),
	loadAllRoutes(server)
]).then(() => {
	server.listen({ port: env.PORT })
		.catch(err => {
			server.log.error("Error starting server")
			console.error(err)
			process.exit(1)
		})
})
