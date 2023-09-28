import { default as _axios } from "axios";
import dotenv from "dotenv";

dotenv.config();

export const axios = _axios.create({
	baseURL: process.env.WEB_APP_BASE_URL ?? "https://giangnguyen.me"
});
