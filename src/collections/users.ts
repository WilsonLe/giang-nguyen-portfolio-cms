import { CollectionConfig } from "payload/types";

export const users: CollectionConfig = {
	slug: "users",
	auth: true,
	admin: { useAsTitle: "email" },
	fields: [{ name: "fullName", type: "text", required: true }]
};
