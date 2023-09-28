import dotenv from "dotenv";
import { GlobalConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const projectsPage: GlobalConfig = {
	slug: "projectsPage",
	fields: [
		{ name: "header", type: "text", required: true },
		{
			name: "projects",
			type: "relationship",
			relationTo: "projects",
			hasMany: true
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
