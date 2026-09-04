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

export default function Home() {
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
        <HeroSection />

        {/* View 2: Featured Project / Core Services */}
        <CoreServicesSection />

        {/* View 3: Embedded System Design */}
        <EmbeddedSystemDesignSection />

        {/* View 4: Hardware & PCB Design */}
        <HardwarePcbDesignSection />

        {/* View 5: Product Development */}
        <ProductDevelopmentSection />

        {/* View 6: Industrial Automation */}
        <IndustrialAutomationSection />

        {/* View 7: Featured Project Splash Banner */}
        <FeaturedProjectSection />
      </StoryScroll>

      {/* View 8: Featured Project Cards List */}
      <FeaturedProjectListSection />

      {/* View 9: Industry Solutions Animated Banner */}
      <IndustrySolutionsSection />

      {/* View 10: Industry Solutions Sliding Carousel & Footer */}
      <IndustrySolutionsListSection />
    </main>
  );
}
