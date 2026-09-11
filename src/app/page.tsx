import HeroSplash from "@/components/home/HeroSplash";
import StoryScroll from "@/components/home/StoryScroll";
import HeroSection from "@/components/home/HeroSection";
import CoreServicesSection from "@/components/home/CoreServicesSection";
import EmbeddedSystemDesignSection from "@/components/home/EmbeddedSystemDesignSection";
import HardwarePcbDesignSection from "@/components/home/HardwarePcbDesignSection";
import ProductDevelopmentSection from "@/components/home/ProductDevelopmentSection";
import IndustrialAutomationSection from "@/components/home/IndustrialAutomationSection";
import FeaturedProjectSection from "@/components/home/FeaturedProjectSection";
import FeaturedProjectListSection from "@/components/home/FeaturedProjectListSection";
import IndustrySolutionsSection from "@/components/home/IndustrySolutionsSection";
import IndustrySolutionsListSection from "@/components/home/IndustrySolutionsListSection";
import { client } from "@/sanity/client";
import {
  HOME_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  type HomePageData,
  type SiteSettings,
} from "@/sanity/queries";

export default async function Home() {
  const [home, settings] = await Promise.all([
    client.fetch<HomePageData>(HOME_PAGE_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  /* The reel is ordered in the Studio; each section takes the clip for its own
     discipline, looked up by the service it links to rather than by position,
     so reordering the reel cannot swap two sections' footage. */
  const clip = (slug: string) => {
    const found = home.serviceMedia.find((m) => m.id === slug);
    if (!found) throw new Error(`Home page has no clip for service "${slug}"`);
    return found;
  };

  const [coreServices, featuredProject, industrySolutions] = home.splashFrames;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      {/* The nine-variant intro from Figma, over the top of the hero until it
          finishes. Skipped outright for reduced-motion, and by any input. */}
      <HeroSplash />

      {/* Views 1-7 are all single-viewport frames, so they run as one story
          scroll: each pins while the next swings in over it. Views 8-10 carry
          their own sticky/marquee behaviour and scroll normally after it. */}
      <StoryScroll ariaLabel="Introduction">
        {/* View 1: Splash Animation For Hero Section */}
        <HeroSection heroCopy={home.hero} />

        {/* View 2: Featured Project / Core Services */}
        <CoreServicesSection frame={coreServices} />

        {/* View 3: Embedded System Design */}
        <EmbeddedSystemDesignSection data={clip("embedded-system-design")} />

        {/* View 4: Hardware & PCB Design */}
        <HardwarePcbDesignSection data={clip("hardware-pcb-design")} />

        {/* View 5: Product Development */}
        <ProductDevelopmentSection data={clip("product-development")} />

        {/* View 6: Industrial Automation */}
        <IndustrialAutomationSection data={clip("industrial-automation")} />

        {/* View 7: Featured Project Splash Banner */}
        <FeaturedProjectSection frame={featuredProject} />
      </StoryScroll>

      {/* View 8: Featured Project Cards List */}
      <FeaturedProjectListSection
        featuredProjects={home.featuredProjects}
        featuredProjectsLede={home.featuredProjectsLede}
      />

      {/* View 9: Industry Solutions Animated Banner */}
      <IndustrySolutionsSection frame={industrySolutions} />

      {/* View 10: Industry Solutions Sliding Carousel & Footer */}
      <IndustrySolutionsListSection
        industriesList={home.industries}
        industriesLede={home.industriesLede}
        settings={settings}
      />
    </main>
  );
}
