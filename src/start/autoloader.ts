import { isHTTPMethod } from "#/utils/fastify"
import type { FastifyInstance, FastifySchema, RouteHandler } from "fastify"
import fs from "fs"
import path from "path"

const autoLoadRoutes = async (server: FastifyInstance, basePath: string, currentPath = ""): Promise<number> => {
	let count = 0
	const files = await fs.promises.readdir(path.join(basePath, currentPath))

	for (const file of files) {
		const fullPath = path.join(basePath, currentPath, file)
		const stat = await fs.promises.stat(fullPath)

		// If it's a directory, recursively load routes
		if (stat.isDirectory()) {
			count += await autoLoadRoutes(server, basePath, path.join(currentPath, file))
			continue
		}

		// If it's not a file or not a TypeScript file, skip
		if (!stat.isFile() || !file.endsWith(".ts")) {
			continue
		}

		// Load the http method from the file name (get.ts -> GET)
		const method = file.replace(".ts", "").toUpperCase()
		if (!isHTTPMethod(method)) {
			continue
		}

		const routePath = currentPath
			.replace(/\\/g, "/") // Convert backslashes to slashes
			.replace(/\[(\w+)\]/g, ":$1") // Convert dynamic route segments to Fastify syntax

		// Import the route handler and schema
		const { handler, schema } = await import(path.join(basePath, currentPath, file)) as {
			handler: RouteHandler
			schema: FastifySchema
		}

		// Register the route
		server.route({
			method: method,
			url: `/${routePath}`,
			handler,
			schema
		})

		count++
	}

	return count
}

export const loadAllRoutes = async (server: FastifyInstance): Promise<void> => {
	// const __filename = fileURLToPath(import.meta.url)
	// const __dirname = path.dirname(__filename)
	const routesDir = path.join(__dirname, "..", "routes")
	const count = await autoLoadRoutes(server, routesDir)
	server.log.info(`Loaded ${count} routes`)
}
