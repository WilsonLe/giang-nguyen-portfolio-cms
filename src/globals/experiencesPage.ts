import dotenv from "dotenv";
import { GlobalConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const experiencesPage: GlobalConfig = {
	slug: "experiencesPage",
	fields: [
		{ name: "header", type: "text", required: true },
		{
			name: "experiences",
			type: "relationship",
			relationTo: "experiences",
			hasMany: true
		}
	],
	access: { read: () => true },
	hooks: {
		afterChange: [
			async (args) => {
				await axios.post("/api/revalidate", {
					token: process.env.REVALIDATION_TOKEN,
					paths: ["/", "/experiences"]
				});
				return args.doc;
			}
		]
	}
};
