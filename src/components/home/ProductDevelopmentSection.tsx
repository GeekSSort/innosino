import ServiceMediaSection from "./ServiceMediaSection";

export default function ProductDevelopmentSection() {
  return (
    <ServiceMediaSection
      id={"product-development"}
      videoSrc={"/homepage_assets/Product Development.mp4"}
      posterSrc={"/posters/homepage_assets/Product Development.webp"}
      webmSrc={"/homepage_assets/Product Development.webm"}
      scrimOpacity={0.12}
      title={"Product Development"}
      body={"Transforming innovative ideas into reliable, market-ready products through research, engineering, and advanced technology."}
    />
  );
}
