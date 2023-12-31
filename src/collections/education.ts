import dotenv from "dotenv";
import { CollectionConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const education: CollectionConfig = {
	slug: "education",
	admin: { useAsTitle: "title" },
	fields: [
		{
			name: "title",
			type: "text",
			required: true
		},
		{
			name: "descriptionLines",
			type: "array",
			fields: [{ name: "description", type: "text", required: true }]
		},
		{
			name: "startDate",
			type: "date",
			required: true
		},
		{
			name: "endDate",
			type: "date"
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
