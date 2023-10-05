import dotenv from "dotenv";
import { CollectionConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const experiences: CollectionConfig = {
	slug: "experiences",
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
			fields: [{ name: "description", type: "text", required: true }],
			required: true
		},
		{
			name: "startDate",
			type: "date",
			required: true
		},
		{
			name: "endDate",
			type: "date",
			required: true
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
