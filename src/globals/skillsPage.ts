import dotenv from "dotenv";
import { GlobalConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const skillsPage: GlobalConfig = {
	slug: "skillsPage",
	fields: [
		{ name: "header", type: "text", required: true },
		{
			name: "skills",
			type: "relationship",
			relationTo: "skills",
			hasMany: true
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
