import dotenv from "dotenv";
import { GlobalConfig } from "payload/types";
import { axios } from "../services/axios";

dotenv.config();

export const aboutPage: GlobalConfig = {
	slug: "aboutPage",
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					name: "banner",
					fields: [
						{
							name: "bannerImage",
							type: "upload",
							relationTo: "media",
							required: true
						},
						{
							type: "tabs",
							tabs: [
								{
									name: "content",
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
											name: "paragraphs",
											type: "array",
											fields: [
												{
													name: "content",
													type: "text",
													required: true
												}
											],
											required: true
										}
									]
								}
							]
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
					name: "education",
					fields: [
						{ name: "header", type: "text", required: true },
						{
							name: "education",
							type: "array",
							fields: [
								{
									name: "title",
									type: "text",
									required: true
								},
								{
									name: "description",
									type: "text"
								},
								{
									name: "href",
									type: "text"
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
							required: true
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
					paths: ["/about"]
				});
				return args.doc;
			}
		]
	}
};
