import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const isServer = () => !(typeof window !== "undefined" && window.document);

const EnvSchema = z.object({
	MONGODB_URI: z.string(),
	PAYLOAD_SECRET: z.string(),
	PORT: z.string(),
	WEB_APP_BASE_URL: z.string(),
	REVALIDATION_TOKEN: z.string()
});

export const env = isServer() ? EnvSchema.parse(process.env) : undefined;
