import LottieSplashSection from "./LottieSplashSection";

export default function FeaturedProjectSection() {
  return (
    <LottieSplashSection
      id="featured-projects"
      path="/featured_project_animation.json"
      backgroundColor="#FFBE03"
      title="Featured Project"
      loopSeconds={2.667}
    />
  );
}
