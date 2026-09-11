import PrivacyPolicy from "@/components/legal/PrivacyPolicy";
import { client } from "@/sanity/client";
import {
  PRIVACY_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  type PrivacyPageData,
  type SiteSettings,
} from "@/sanity/queries";

export default async function PrivacyPolicyPage() {
  const [page, settings] = await Promise.all([
    client.fetch<PrivacyPageData>(PRIVACY_PAGE_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  return <PrivacyPolicy page={page} settings={settings} />;
}
