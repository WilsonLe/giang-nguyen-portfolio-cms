import dotenv from "dotenv";
import { CollectionConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const skills: CollectionConfig = {
	slug: "skills",
	admin: { useAsTitle: "name" },
	fields: [
		{
			name: "name",
			type: "text",
			required: true
		},
		{
			name: "tab",
			type: "relationship",
			relationTo: "skillTabs",
			hasMany: false,
			required: true
		}
	],
	access: { read: () => true },
	hooks: {
		afterChange: [
			async (args) => {
				await axios.post("/api/revalidate", {
					token: process.env.REVALIDATION_TOKEN,
					paths: ["/", "/skills"]
				});
				return args.doc;
			}
		]
	}
};
