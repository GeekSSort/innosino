import LottieSplashSection from "./LottieSplashSection";
import type { HomePageData } from "@/sanity/queries";

export default function FeaturedProjectSection({ frame }: { frame: HomePageData["splashFrames"][number] }) {
  return (
    <LottieSplashSection
      id="featured-projects"
      path="/featured_project_animation.json"
      backgroundColor="#FFBE03"
      title={frame.title}
      loopSeconds={frame.loopSeconds}
    />
  );
}
