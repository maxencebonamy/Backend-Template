import type { HTTPMethods } from "fastify"

export const isHTTPMethod = (method: string): method is HTTPMethods => {
	const methods = [
		"DELETE",
		"GET",
		"HEAD",
		"PATCH",
		"POST",
		"PUT",
		"OPTIONS",
		"PROPFIND",
		"PROPPATCH",
		"MKCOL",
		"COPY",
		"MOVE",
		"LOCK",
		"UNLOCK",
		"TRACE",
		"SEARCH",
		"REPORT",
		"MKCALENDAR"
	]

	return methods.includes(method.toUpperCase())
}
