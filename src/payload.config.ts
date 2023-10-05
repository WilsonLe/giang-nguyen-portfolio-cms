import path from "path";
import { buildConfig } from "payload/config";
import { experiences } from "./collections/experiences";
import { media } from "./collections/media";
import { projects } from "./collections/projects";
import { skills } from "./collections/skills";
import { skillTabs } from "./collections/skillTabs";
import { users } from "./collections/users";
import { aboutPage } from "./globals/aboutPage";
import { homePage } from "./globals/homePage";
import { navigations } from "./globals/navigations";
import { projectsPage } from "./globals/projectsPage";

export default buildConfig({
	admin: { user: users.slug },
	collections: [users, projects, media, skills, skillTabs, experiences],
	globals: [homePage, aboutPage, projectsPage, navigations],
	upload: { limits: { fileSize: 1024 * 1024 * 1024 } },
	typescript: { outputFile: path.resolve(__dirname, "payload-types.ts") }
});
