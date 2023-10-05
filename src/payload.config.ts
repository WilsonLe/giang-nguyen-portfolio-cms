import path from "path";
import { buildConfig } from "payload/config";
import { education } from "./collections/education";
import { experiences } from "./collections/experiences";
import { media } from "./collections/media";
import { projects } from "./collections/projects";
import { skills } from "./collections/skills";
import { skillTabs } from "./collections/skillTabs";
import { users } from "./collections/users";
import { aboutPage } from "./globals/aboutPage";
import { educationPage } from "./globals/educationPage";
import { experiencesPage } from "./globals/experiencesPage";
import { homePage } from "./globals/homePage";
import { navigations } from "./globals/navigations";
import { projectsPage } from "./globals/projectsPage";
import { skillsPage } from "./globals/skillsPage";

export default buildConfig({
	admin: { user: users.slug },
	collections: [
		users,
		projects,
		media,
		skills,
		skillTabs,
		experiences,
		education
	],
	globals: [
		homePage,
		aboutPage,
		skillsPage,
		experiencesPage,
		projectsPage,
		educationPage,
		navigations
	],
	upload: { limits: { fileSize: 1024 * 1024 * 1024 } },
	typescript: { outputFile: path.resolve(__dirname, "payload-types.ts") }
});
