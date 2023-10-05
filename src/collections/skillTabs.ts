import dotenv from "dotenv";
import { CollectionConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const skillTabs: CollectionConfig = {
	slug: "skillTabs",
	admin: { useAsTitle: "name" },
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			unique: true
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
