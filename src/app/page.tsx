import HeroSection from "@/components/home/HeroSection";
import CoreServicesSection from "@/components/home/CoreServicesSection";
import EmbeddedSystemDesignSection from "@/components/home/EmbeddedSystemDesignSection";
import HardwarePcbDesignSection from "@/components/home/HardwarePcbDesignSection";
import ProductDevelopmentSection from "@/components/home/ProductDevelopmentSection";
import IndustrialAutomationSection from "@/components/home/IndustrialAutomationSection";
import FeaturedProjectSection from "@/components/home/FeaturedProjectSection";

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

      {/* View 7: Featured Project */}
      <FeaturedProjectSection />
    </main>
  );
}
