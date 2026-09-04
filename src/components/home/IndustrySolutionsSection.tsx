import LottieSplashSection from "./LottieSplashSection";

export default function IndustrySolutionsSection() {
  return (
    <LottieSplashSection
      id="industries"
      path="/industry_solutions_animation.json"
      backgroundColor="#000000"
      title="Industry Solutions"
      loopSeconds={2.467}
    >
      {/* Figma centres this headline optically inside the animated frame
          (x 335-972 of 1440, y 372-455 of 810), so it is centred rather than
          pinned to a coordinate. */}
      <div className="splash-headline">
        <h2 className="splash-headline__text">INDUSTRY SOLUTIONS</h2>
      </div>
    </LottieSplashSection>
  );
}
