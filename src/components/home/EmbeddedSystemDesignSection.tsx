import ServiceMediaSection from "./ServiceMediaSection";

export default function EmbeddedSystemDesignSection() {
  return (
    <ServiceMediaSection
      id={"embedded-system-design"}
      videoSrc={"/homepage_assets/Embedded System Design.mp4"}
      posterSrc={"/posters/homepage_assets/Embedded System Design.webp"}
      scrimOpacity={0.12}
      title={"Embedded System Design"}
      body={"We build intelligent, energy-efficient embedded systems with seamless hardware-software integration, delivering reliable solutions tailored to your application."}
    />
  );
}
