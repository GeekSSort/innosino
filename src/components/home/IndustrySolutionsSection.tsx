import LottieSplashSection from "./LottieSplashSection";
import { splashFrames } from "@/content/home";

export default function IndustrySolutionsSection() {
  return (
    <LottieSplashSection
      id="industries"
      path="/industry_solutions_animation.json"
      backgroundColor="#000000"
      title={splashFrames.industrySolutions.title}
      loopSeconds={splashFrames.industrySolutions.loopSeconds}
    >
      {/* Figma centres this headline optically inside the animated frame
          (x 335-972 of 1440, y 372-455 of 810), so it is centred rather than
          pinned to a coordinate. */}
      <div className="splash-headline">
        <h2 className="splash-headline__text">
          {splashFrames.industrySolutions.heading}
        </h2>
      </div>
    </LottieSplashSection>
  );
}
