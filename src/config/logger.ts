import type { RawServerBase } from "fastify"
import type { FastifyLoggerOptions, PinoLoggerOptions } from "fastify/types/logger.js"

const loggerConfig = {
	transport: {
		target: "@fastify/one-line-logger"
	}
} satisfies FastifyLoggerOptions<RawServerBase> & PinoLoggerOptions

export default loggerConfig
