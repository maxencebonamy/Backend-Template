export const categorySchema = {
	type: "object",
	properties: {
		id: { type: "string", format: "uuid" },
		name: { type: "string" },
		color: { type: "string" }
	},
	required: [ "id", "color", "name" ]
}
