import LottieSplashSection from "./LottieSplashSection";
import type { HomePageData } from "@/sanity/queries";

export default function CoreServicesSection({ frame }: { frame: HomePageData["splashFrames"][number] }) {
  return (
    <LottieSplashSection
      id="core-services"
      path="/core_services_animation.json"
      backgroundColor="#FF7018"
      title={frame.title}
      loopSeconds={frame.loopSeconds}
    />
  );
}
