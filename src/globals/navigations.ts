import { GlobalConfig } from "payload/types";
import { axios } from "../services/axios";

export const navigations: GlobalConfig = {
	slug: "navigations",
	fields: [
		{
			name: "navigations",
			type: "array",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					admin: {
						description: "Display name of the navigation button"
					}
				},
				{
					name: "href",
					type: "text",
					required: true,
					admin: {
						description:
							'link to navigate to a page. For instance: a value of "/about" will lead user to "www.giangnguyen.me/about"'
					}
				}
			],
			required: true
		}
	],
	hooks: {
		afterChange: [
			async (args) => {
				const allPaths = await args.req.payload.findGlobal({
					slug: "navigations"
				});
				await axios.post("/api/revalidate", {
					token: process.env.REVALIDATION_TOKEN,
					paths: allPaths.navigations.map((nav) => nav.href)
				});
				return args.doc;
			}
		]
	},
	access: { read: () => true }
};
