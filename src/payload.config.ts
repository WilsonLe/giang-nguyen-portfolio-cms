import path from "path";
import { buildConfig } from "payload/config";
import { media } from "./collections/media";
import { projects } from "./collections/projects";
import { users } from "./collections/users";
import { aboutPage } from "./globals/aboutPage";
import { homePage } from "./globals/homePage";
import { projectsPage } from "./globals/projectsPage";

export default buildConfig({
	admin: { user: users.slug },
	collections: [users, projects, media],
	globals: [homePage, aboutPage, projectsPage],
	upload: { limits: { fileSize: 1024 * 1024 * 1024 } },
	typescript: { outputFile: path.resolve(__dirname, "payload-types.ts") }
});
