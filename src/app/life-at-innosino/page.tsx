import LifeAtInnosino from "@/components/life/LifeAtInnosino";
import { client } from "@/sanity/client";
import {
  LIFE_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  type LifePageData,
  type SiteSettings,
} from "@/sanity/queries";

export default async function LifeAtInnosinoPage() {
  const [page, settings] = await Promise.all([
    client.fetch<LifePageData>(LIFE_PAGE_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  return <LifeAtInnosino page={page} settings={settings} />;
}
