import dotenv from "dotenv";
import { GlobalConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const educationPage: GlobalConfig = {
	slug: "educationPage",
	fields: [
		{ name: "header", type: "text", required: true },
		{
			name: "education",
			type: "relationship",
			relationTo: "education",
			hasMany: true
		}
	],
	access: { read: () => true },
	hooks: {
		afterChange: [
			async (args) => {
				await axios.post("/api/revalidate", {
					token: process.env.REVALIDATION_TOKEN,
					paths: ["/", "/education"]
				});
				return args.doc;
			}
		]
	}
};
