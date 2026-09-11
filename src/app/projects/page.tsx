import ProjectsIndex from "@/components/projects/ProjectsIndex";
import { client } from "@/sanity/client";
import {
  PROJECTS_PAGE_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
  type Project,
  type ProjectsPageData,
  type SiteSettings,
} from "@/sanity/queries";

/**
 * A Server Component so the queries run during `next build`; the filter pills,
 * search box and pagination are browser state and stay in ProjectsIndex.
 */
export default async function ProjectsPage() {
  const [page, projects, settings] = await Promise.all([
    client.fetch<ProjectsPageData>(PROJECTS_PAGE_QUERY),
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  return (
    <ProjectsIndex
      page={page}
      projects={projects}
      featured={projects.find((p) => p.isFeatured)}
      settings={settings}
    />
  );
}
