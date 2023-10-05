import dotenv from "dotenv";
import { GlobalConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const homePage: GlobalConfig = {
	slug: "homePage",
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					name: "landingPageBanner",
					fields: [
						{
							name: "primaryHeaders",
							type: "array",
							fields: [
								{
									name: "content",
									type: "text",
									required: true
								}
							],
							required: true
						},
						{
							name: "secondaryHeaders",
							type: "array",
							fields: [
								{
									name: "content",
									type: "text",
									required: true
								}
							],
							required: true
						},
						{
							name: "resume",
							type: "upload",
							relationTo: "media",
							required: true
						},
						{
							name: "resumeDownloadText",
							type: "text",
							required: true
						},
						{
							type: "tabs",
							tabs: [
								{
									name: "landingPageBannerImage",
									fields: [
										{
											name: "light",
											type: "upload",
											relationTo: "media",
											required: true,
											admin: {
												description: "Square image"
											}
										},
										{
											name: "dark",
											type: "upload",
											relationTo: "media",
											required: true,
											admin: {
												description: "Square image"
											}
										}
									]
								}
							],
							required: true
						}
					]
				}
			],
			required: true
		},
		{
			type: "tabs",
			tabs: [
				{
					name: "skills",
					fields: [
						{ name: "header", type: "text", required: true },
						{
							name: "skills",
							type: "relationship",
							relationTo: "skills",
							hasMany: true
						}
					]
				}
			]
		},
		{
			type: "tabs",
			tabs: [
				{
					name: "experiences",
					fields: [
						{ name: "header", type: "text", required: true },
						{
							name: "experiences",
							type: "relationship",
							relationTo: "experiences",
							hasMany: true
						}
					]
				}
			]
		},
		{
			type: "tabs",
			tabs: [
				{
					name: "projects",
					fields: [
						{ name: "header", type: "text", required: true },
						{
							name: "projects",
							type: "relationship",
							relationTo: "projects",
							hasMany: true
						}
					]
				}
			]
		},
		{
			type: "tabs",
			tabs: [
				{
					name: "education",
					fields: [
						{ name: "header", type: "text", required: true },
						{
							name: "education",
							type: "relationship",
							relationTo: "education",
							hasMany: true
						}
					]
				}
			]
		}
	],
	access: { read: () => true },
	hooks: {
		afterChange: [
			async (args) => {
				await axios.post("/api/revalidate", {
					token: process.env.REVALIDATION_TOKEN,
					paths: ["/"]
				});
				return args.doc;
			}
		]
	}
};
