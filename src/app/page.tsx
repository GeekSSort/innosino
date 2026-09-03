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

      {/* View 8: Featured Project Cards List */}
      <FeaturedProjectListSection />

      {/* View 9: Industry Solutions Animated Banner */}
      <IndustrySolutionsSection />

      {/* View 10: Industry Solutions Sliding Carousel & Footer */}
      <IndustrySolutionsListSection />
    </main>
  );
}
