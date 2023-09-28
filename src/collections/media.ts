import type { CollectionConfig } from "payload/types";

export const media: CollectionConfig = {
	slug: "media",
	access: { read: () => true },
	upload: {
		staticDir: "../media",
		staticURL: "/media"
	},
	fields: [
		{
			name: "alt",
			label: "Alternate Text",
			localized: true,
			type: "text",
			required: true,
			admin: {
				description:
					"In case of slow internet or user cannot see the file, this piece of text will describe what the file is."
			}
		}
	]
};
