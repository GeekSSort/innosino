import ContactForm from "@/components/contact/ContactForm";
import { client } from "@/sanity/client";
import {
  CONTACT_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  type ContactPageData,
  type SiteSettings,
} from "@/sanity/queries";

/**
 * A Server Component so the copy is fetched at build time; the enquiry form,
 * its validation and the live office clocks are browser state and stay in
 * ContactForm.
 */
export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    client.fetch<ContactPageData>(CONTACT_PAGE_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  return <ContactForm page={page} settings={settings} />;
}
