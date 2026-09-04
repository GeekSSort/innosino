import LottieSplashSection from "./LottieSplashSection";
import { splashFrames } from "@/content/home";

export default function FeaturedProjectSection() {
  return (
    <LottieSplashSection
      id="featured-projects"
      path="/featured_project_animation.json"
      backgroundColor="#FFBE03"
      title={splashFrames.featuredProject.title}
      loopSeconds={splashFrames.featuredProject.loopSeconds}
    />
  );
}
