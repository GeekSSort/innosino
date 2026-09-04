import LottieSplashSection from "./LottieSplashSection";
import { splashFrames } from "@/content/home";

export default function CoreServicesSection() {
  return (
    <LottieSplashSection
      id="core-services"
      path="/core_services_animation.json"
      backgroundColor="#FF7018"
      title={splashFrames.coreServices.title}
      loopSeconds={splashFrames.coreServices.loopSeconds}
    />
  );
}
