import { CollectionConfig } from "payload/types";
import { axios } from "../services/axios";
import { env } from "../services/env";
export const projects: CollectionConfig = {
	slug: "projects",
	admin: { useAsTitle: "title" },
	fields: [
		{
			name: "slug",
			type: "text",
			unique: true,
			admin: {
				description: `The link to the project. For example: if value is "project-tdn", then the link to the project detail page is "giangnguyen.me/projects/project-tdn"`
			},
			required: true
		},
		{
			name: "title",
			type: "text",
			required: true
		},
		{
			name: "illustration",
			type: "relationship",
			relationTo: "media",
			hasMany: false,
			required: true,
			admin: {
				description: `Illustration image displayed on the detail page about the project`
			}
		},
		{
			name: "description",
			type: "text",
			required: true,
			admin: { description: `Detail description of the project` }
		},
		{
			name: "startDate",
			type: "date",
			required: true,
			admin: { description: "Start date of the project" }
		},
		{
			name: "endDate",
			type: "date",
			required: true,
			admin: { description: "End date of the project" }
		}
	],
	access: { read: () => true },
	hooks: {
		afterChange: [
			async (args) => {
				await axios.post("/api/revalidate", {
					token: env?.REVALIDATION_TOKEN,
					paths: ["/", "/projects"]
				});
				return args.doc;
			}
		]
	}
};
