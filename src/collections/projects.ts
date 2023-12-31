import dotenv from "dotenv";
import { CollectionConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

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
			name: "shortDescription",
			type: "text",
			required: true,
			admin: { description: `Short description of the project` }
		},
		{
			name: "longDescription",
			type: "blocks",
			blocks: [
				{
					slug: "Paragraph",
					fields: [{ name: "content", type: "text", required: true }]
				},
				{
					slug: "Image",
					fields: [
						{
							name: "image",
							type: "upload",
							relationTo: "media",
							required: true
						}
					]
				}
			],
			required: true,
			admin: { description: `Long description of the project` }
		},
		{
			name: "assets",
			type: "array",
			fields: [
				{
					name: "file",
					type: "upload",
					relationTo: "media",
					required: true
				}
			],
			admin: { description: "Any files assosiated with this projects" }
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
					token: process.env.REVALIDATION_TOKEN,
					paths: ["/", "/projects"]
				});
				return args.doc;
			}
		]
	}
};
